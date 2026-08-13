package com.stayfix.entity;

import com.stayfix.enum_.Category;
import com.stayfix.enum_.Priority;
import com.stayfix.enum_.Status;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "complaints", indexes = {
        @Index(name = "idx_complaint_status", columnList = "status"),
        @Index(name = "idx_complaint_category", columnList = "category"),
        @Index(name = "idx_complaint_student", columnList = "student_id"),
        @Index(name = "idx_complaint_staff", columnList = "assigned_staff_id")
})
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Priority priority = Priority.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_staff_id")
    private User assignedStaff;

    @Column(name = "staff_remarks", columnDefinition = "TEXT")
    private String staffRemarks;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @OneToMany(mappedBy = "complaint", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ComplaintImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "complaint", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ComplaintHistory> historyList = new ArrayList<>();

    @OneToOne(mappedBy = "complaint", cascade = CascadeType.ALL, orphanRemoval = true)
    private Feedback feedback;

    public Complaint() {}

    public Complaint(Long id, String title, String description, Category category, Priority priority, Status status, User student, User assignedStaff, String staffRemarks, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime resolvedAt, List<ComplaintImage> images, List<ComplaintHistory> historyList, Feedback feedback) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority != null ? priority : Priority.MEDIUM;
        this.status = status != null ? status : Status.PENDING;
        this.student = student;
        this.assignedStaff = assignedStaff;
        this.staffRemarks = staffRemarks;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.resolvedAt = resolvedAt;
        this.images = images != null ? images : new ArrayList<>();
        this.historyList = historyList != null ? historyList : new ArrayList<>();
        this.feedback = feedback;
    }

    public static ComplaintBuilder builder() {
        return new ComplaintBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public User getAssignedStaff() { return assignedStaff; }
    public void setAssignedStaff(User assignedStaff) { this.assignedStaff = assignedStaff; }

    public String getStaffRemarks() { return staffRemarks; }
    public void setStaffRemarks(String staffRemarks) { this.staffRemarks = staffRemarks; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }

    public List<ComplaintImage> getImages() { return images; }
    public void setImages(List<ComplaintImage> images) { this.images = images; }

    public List<ComplaintHistory> getHistoryList() { return historyList; }
    public void setHistoryList(List<ComplaintHistory> historyList) { this.historyList = historyList; }

    public Feedback getFeedback() { return feedback; }
    public void setFeedback(Feedback feedback) { this.feedback = feedback; }

    public static class ComplaintBuilder {
        private Long id;
        private String title;
        private String description;
        private Category category;
        private Priority priority = Priority.MEDIUM;
        private Status status = Status.PENDING;
        private User student;
        private User assignedStaff;
        private String staffRemarks;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private LocalDateTime resolvedAt;
        private List<ComplaintImage> images = new ArrayList<>();
        private List<ComplaintHistory> historyList = new ArrayList<>();
        private Feedback feedback;

        public ComplaintBuilder id(Long id) { this.id = id; return this; }
        public ComplaintBuilder title(String title) { this.title = title; return this; }
        public ComplaintBuilder description(String description) { this.description = description; return this; }
        public ComplaintBuilder category(Category category) { this.category = category; return this; }
        public ComplaintBuilder priority(Priority priority) { this.priority = priority; return this; }
        public ComplaintBuilder status(Status status) { this.status = status; return this; }
        public ComplaintBuilder student(User student) { this.student = student; return this; }
        public ComplaintBuilder assignedStaff(User assignedStaff) { this.assignedStaff = assignedStaff; return this; }
        public ComplaintBuilder staffRemarks(String staffRemarks) { this.staffRemarks = staffRemarks; return this; }
        public ComplaintBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ComplaintBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        public ComplaintBuilder resolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; return this; }
        public ComplaintBuilder images(List<ComplaintImage> images) { this.images = images; return this; }
        public ComplaintBuilder historyList(List<ComplaintHistory> historyList) { this.historyList = historyList; return this; }
        public ComplaintBuilder feedback(Feedback feedback) { this.feedback = feedback; return this; }

        public Complaint build() {
            return new Complaint(id, title, description, category, priority, status, student, assignedStaff, staffRemarks, createdAt, updatedAt, resolvedAt, images, historyList, feedback);
        }
    }
}
