package com.stayfix.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_id", nullable = false, unique = true)
    private Complaint complaint;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Feedback() {}

    public Feedback(Long id, Complaint complaint, User student, Integer rating, String comment, LocalDateTime createdAt) {
        this.id = id;
        this.complaint = complaint;
        this.student = student;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
    }

    public static FeedbackBuilder builder() {
        return new FeedbackBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Complaint getComplaint() { return complaint; }
    public void setComplaint(Complaint complaint) { this.complaint = complaint; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class FeedbackBuilder {
        private Long id;
        private Complaint complaint;
        private User student;
        private Integer rating;
        private String comment;
        private LocalDateTime createdAt;

        public FeedbackBuilder id(Long id) { this.id = id; return this; }
        public FeedbackBuilder complaint(Complaint complaint) { this.complaint = complaint; return this; }
        public FeedbackBuilder student(User student) { this.student = student; return this; }
        public FeedbackBuilder rating(Integer rating) { this.rating = rating; return this; }
        public FeedbackBuilder comment(String comment) { this.comment = comment; return this; }
        public FeedbackBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Feedback build() {
            return new Feedback(id, complaint, student, rating, comment, createdAt);
        }
    }
}
