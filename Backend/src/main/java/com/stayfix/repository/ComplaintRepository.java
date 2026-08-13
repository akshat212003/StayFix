package com.stayfix.repository;

import com.stayfix.entity.Complaint;
import com.stayfix.entity.User;
import com.stayfix.enum_.Category;
import com.stayfix.enum_.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByStudentOrderByCreatedAtDesc(User student);

    List<Complaint> findByAssignedStaffOrderByCreatedAtDesc(User assignedStaff);

    List<Complaint> findByStatus(Status status);

    List<Complaint> findByCategory(Category category);

    @Query("SELECT c FROM Complaint c WHERE " +
            "(:status IS NULL OR c.status = :status) AND " +
            "(:category IS NULL OR c.category = :category) AND " +
            "(:keyword IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "ORDER BY c.createdAt DESC")
    List<Complaint> searchComplaints(@Param("status") Status status,
                                     @Param("category") Category category,
                                     @Param("keyword") String keyword);

    @Query("SELECT c FROM Complaint c WHERE c.student = :student AND " +
            "(:status IS NULL OR c.status = :status) AND " +
            "(:keyword IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "ORDER BY c.createdAt DESC")
    List<Complaint> searchStudentComplaints(@Param("student") User student,
                                            @Param("status") Status status,
                                            @Param("keyword") String keyword);

    @Query("SELECT c FROM Complaint c WHERE c.assignedStaff = :staff AND " +
            "(:status IS NULL OR c.status = :status) AND " +
            "(:keyword IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "ORDER BY c.createdAt DESC")
    List<Complaint> searchStaffComplaints(@Param("staff") User staff,
                                          @Param("status") Status status,
                                          @Param("keyword") String keyword);

    long countByStatus(Status status);

    long countByStudent(User student);

    long countByStudentAndStatus(User student, Status status);

    long countByAssignedStaffAndStatus(User staff, Status status);

    @Query("SELECT c.category, COUNT(c) FROM Complaint c GROUP BY c.category")
    List<Object[]> countComplaintsByCategory();

    @Query("SELECT c.assignedStaff.id, c.assignedStaff.fullName, c.assignedStaff.email, " +
            "COUNT(c), " +
            "SUM(CASE WHEN c.status = 'RESOLVED' OR c.status = 'CLOSED' THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN c.status != 'RESOLVED' AND c.status != 'CLOSED' THEN 1 ELSE 0 END) " +
            "FROM Complaint c WHERE c.assignedStaff IS NOT NULL GROUP BY c.assignedStaff.id, c.assignedStaff.fullName, c.assignedStaff.email")
    List<Object[]> getStaffPerformanceMetrics();
}
