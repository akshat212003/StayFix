package com.stayfix.repository;

import com.stayfix.entity.Complaint;
import com.stayfix.entity.ComplaintHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintHistoryRepository extends JpaRepository<ComplaintHistory, Long> {
    List<ComplaintHistory> findByComplaintOrderByTimestampDesc(Complaint complaint);
}
