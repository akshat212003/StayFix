package com.stayfix.repository;

import com.stayfix.entity.Complaint;
import com.stayfix.entity.Feedback;
import com.stayfix.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Optional<Feedback> findByComplaint(Complaint complaint);
    List<Feedback> findByStudentOrderByCreatedAtDesc(User student);

    @Query("SELECT AVG(f.rating) FROM Feedback f")
    Double getAverageSystemRating();

    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.complaint.assignedStaff.id = :staffId")
    Double getAverageStaffRating(Long staffId);
}
