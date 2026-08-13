package com.stayfix.entity;

import com.stayfix.enum_.Status;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaint_history")
public class ComplaintHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_id", nullable = false)
    private Complaint complaint;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by_id", nullable = false)
    private User updatedBy;

    @Enumerated(EnumType.STRING)
    @Column(name = "previous_status", length = 20)
    private Status previousStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "new_status", nullable = false, length = 20)
    private Status newStatus;

    @Column(length = 255)
    private String remark;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime timestamp;

    public ComplaintHistory() {}

    public ComplaintHistory(Long id, Complaint complaint, User updatedBy, Status previousStatus, Status newStatus, String remark, LocalDateTime timestamp) {
        this.id = id;
        this.complaint = complaint;
        this.updatedBy = updatedBy;
        this.previousStatus = previousStatus;
        this.newStatus = newStatus;
        this.remark = remark;
        this.timestamp = timestamp;
    }

    public static ComplaintHistoryBuilder builder() {
        return new ComplaintHistoryBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Complaint getComplaint() { return complaint; }
    public void setComplaint(Complaint complaint) { this.complaint = complaint; }

    public User getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(User updatedBy) { this.updatedBy = updatedBy; }

    public Status getPreviousStatus() { return previousStatus; }
    public void setPreviousStatus(Status previousStatus) { this.previousStatus = previousStatus; }

    public Status getNewStatus() { return newStatus; }
    public void setNewStatus(Status newStatus) { this.newStatus = newStatus; }

    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public static class ComplaintHistoryBuilder {
        private Long id;
        private Complaint complaint;
        private User updatedBy;
        private Status previousStatus;
        private Status newStatus;
        private String remark;
        private LocalDateTime timestamp;

        public ComplaintHistoryBuilder id(Long id) { this.id = id; return this; }
        public ComplaintHistoryBuilder complaint(Complaint complaint) { this.complaint = complaint; return this; }
        public ComplaintHistoryBuilder updatedBy(User updatedBy) { this.updatedBy = updatedBy; return this; }
        public ComplaintHistoryBuilder previousStatus(Status previousStatus) { this.previousStatus = previousStatus; return this; }
        public ComplaintHistoryBuilder newStatus(Status newStatus) { this.newStatus = newStatus; return this; }
        public ComplaintHistoryBuilder remark(String remark) { this.remark = remark; return this; }
        public ComplaintHistoryBuilder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }

        public ComplaintHistory build() {
            return new ComplaintHistory(id, complaint, updatedBy, previousStatus, newStatus, remark, timestamp);
        }
    }
}
