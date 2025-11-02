package com.springai.b2b.repository;

import com.springai.b2b.entity.B2BTransaction;
import com.springai.b2b.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface B2BTransactionRepository extends JpaRepository<B2BTransaction, Long> {

    Optional<B2BTransaction> findByTransactionId(String transactionId);

    List<B2BTransaction> findByUser(User user);

    List<B2BTransaction> findByUserOrderByCreatedAtDesc(User user);

    List<B2BTransaction> findByStatus(B2BTransaction.TransactionStatus status);

    List<B2BTransaction> findByUserAndStatus(User user, B2BTransaction.TransactionStatus status);

    @Query("SELECT t FROM B2BTransaction t WHERE t.user = ?1 AND t.createdAt BETWEEN ?2 AND ?3")
    List<B2BTransaction> findByUserAndDateRange(User user, LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT t FROM B2BTransaction t WHERE t.buyerCompany = ?1 OR t.sellerCompany = ?1")
    List<B2BTransaction> findByCompany(String companyName);
}
