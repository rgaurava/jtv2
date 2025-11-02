package com.springai.b2b.dto;

import com.springai.b2b.entity.B2BTransaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {

    private Long id;
    private String transactionId;
    private String buyerCompany;
    private String sellerCompany;
    private String productName;
    private String productDescription;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalAmount;
    private String currency;
    private B2BTransaction.TransactionStatus status;
    private String paymentTerms;
    private LocalDateTime deliveryDate;
    private String notes;
    private String aiInsights;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
