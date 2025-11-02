package com.springai.b2b.service;

import com.springai.b2b.dto.TransactionRequest;
import com.springai.b2b.dto.TransactionResponse;
import com.springai.b2b.entity.B2BTransaction;
import com.springai.b2b.entity.User;
import com.springai.b2b.repository.B2BTransactionRepository;
import com.springai.b2b.repository.UserRepository;
import com.springai.b2b.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final B2BTransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final ChatClient.Builder chatClientBuilder;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public TransactionResponse createTransaction(TransactionRequest request) {
        User user = getCurrentUser();

        BigDecimal totalAmount = request.getUnitPrice().multiply(BigDecimal.valueOf(request.getQuantity()));

        B2BTransaction transaction = B2BTransaction.builder()
                .transactionId(UUID.randomUUID().toString())
                .user(user)
                .buyerCompany(request.getBuyerCompany())
                .sellerCompany(request.getSellerCompany())
                .productName(request.getProductName())
                .productDescription(request.getProductDescription())
                .quantity(request.getQuantity())
                .unitPrice(request.getUnitPrice())
                .totalAmount(totalAmount)
                .currency(request.getCurrency() != null ? request.getCurrency() : "USD")
                .paymentTerms(request.getPaymentTerms())
                .deliveryDate(request.getDeliveryDate())
                .notes(request.getNotes())
                .status(B2BTransaction.TransactionStatus.PENDING)
                .build();

        // Generate AI insights
        String aiInsights = generateAIInsights(transaction);
        transaction.setAiInsights(aiInsights);

        transaction = transactionRepository.save(transaction);

        return mapToResponse(transaction);
    }

    public List<TransactionResponse> getAllTransactions() {
        User user = getCurrentUser();
        List<B2BTransaction> transactions = transactionRepository.findByUserOrderByCreatedAtDesc(user);
        return transactions.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TransactionResponse getTransactionById(Long id) {
        User user = getCurrentUser();
        B2BTransaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().equals(user.getId()) && !user.getRoles().contains("ADMIN")) {
            throw new RuntimeException("Unauthorized access to transaction");
        }

        return mapToResponse(transaction);
    }

    @Transactional
    public TransactionResponse updateTransaction(Long id, TransactionRequest request) {
        User user = getCurrentUser();
        B2BTransaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().equals(user.getId()) && !user.getRoles().contains("ADMIN")) {
            throw new RuntimeException("Unauthorized access to transaction");
        }

        transaction.setBuyerCompany(request.getBuyerCompany());
        transaction.setSellerCompany(request.getSellerCompany());
        transaction.setProductName(request.getProductName());
        transaction.setProductDescription(request.getProductDescription());
        transaction.setQuantity(request.getQuantity());
        transaction.setUnitPrice(request.getUnitPrice());
        transaction.setTotalAmount(request.getUnitPrice().multiply(BigDecimal.valueOf(request.getQuantity())));
        transaction.setCurrency(request.getCurrency() != null ? request.getCurrency() : "USD");
        transaction.setPaymentTerms(request.getPaymentTerms());
        transaction.setDeliveryDate(request.getDeliveryDate());
        transaction.setNotes(request.getNotes());

        // Regenerate AI insights
        String aiInsights = generateAIInsights(transaction);
        transaction.setAiInsights(aiInsights);

        transaction = transactionRepository.save(transaction);

        return mapToResponse(transaction);
    }

    @Transactional
    public TransactionResponse updateTransactionStatus(Long id, B2BTransaction.TransactionStatus status) {
        User user = getCurrentUser();
        B2BTransaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().equals(user.getId()) && !user.getRoles().contains("ADMIN")) {
            throw new RuntimeException("Unauthorized access to transaction");
        }

        transaction.setStatus(status);
        transaction = transactionRepository.save(transaction);

        return mapToResponse(transaction);
    }

    @Transactional
    public void deleteTransaction(Long id) {
        User user = getCurrentUser();
        B2BTransaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().equals(user.getId()) && !user.getRoles().contains("ADMIN")) {
            throw new RuntimeException("Unauthorized access to transaction");
        }

        transactionRepository.delete(transaction);
    }

    private String generateAIInsights(B2BTransaction transaction) {
        try {
            ChatClient chatClient = chatClientBuilder.build();

            String promptText = """
                Analyze this B2B transaction and provide brief insights:

                Buyer: {buyer}
                Seller: {seller}
                Product: {product}
                Quantity: {quantity}
                Unit Price: {unitPrice} {currency}
                Total Amount: {totalAmount} {currency}
                Payment Terms: {paymentTerms}

                Provide a brief analysis covering:
                1. Risk assessment
                2. Pricing analysis
                3. Key recommendations

                Keep the response concise (3-4 sentences).
                """;

            PromptTemplate promptTemplate = new PromptTemplate(promptText);
            Prompt prompt = promptTemplate.create(Map.of(
                    "buyer", transaction.getBuyerCompany(),
                    "seller", transaction.getSellerCompany(),
                    "product", transaction.getProductName(),
                    "quantity", transaction.getQuantity().toString(),
                    "unitPrice", transaction.getUnitPrice().toString(),
                    "totalAmount", transaction.getTotalAmount().toString(),
                    "currency", transaction.getCurrency(),
                    "paymentTerms", transaction.getPaymentTerms() != null ? transaction.getPaymentTerms() : "N/A"
            ));

            return chatClient.prompt(prompt).call().content();
        } catch (Exception e) {
            return "AI insights unavailable. Please configure your OpenAI API key.";
        }
    }

    private TransactionResponse mapToResponse(B2BTransaction transaction) {
        return TransactionResponse.builder()
                .id(transaction.getId())
                .transactionId(transaction.getTransactionId())
                .buyerCompany(transaction.getBuyerCompany())
                .sellerCompany(transaction.getSellerCompany())
                .productName(transaction.getProductName())
                .productDescription(transaction.getProductDescription())
                .quantity(transaction.getQuantity())
                .unitPrice(transaction.getUnitPrice())
                .totalAmount(transaction.getTotalAmount())
                .currency(transaction.getCurrency())
                .status(transaction.getStatus())
                .paymentTerms(transaction.getPaymentTerms())
                .deliveryDate(transaction.getDeliveryDate())
                .notes(transaction.getNotes())
                .aiInsights(transaction.getAiInsights())
                .createdAt(transaction.getCreatedAt())
                .updatedAt(transaction.getUpdatedAt())
                .build();
    }
}
