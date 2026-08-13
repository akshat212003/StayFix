package com.stayfix.dto;

import java.time.LocalDateTime;

public class FeedbackDto {
    private Long id;
    private Long complaintId;
    private UserDto student;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public FeedbackDto() {}

    public FeedbackDto(Long id, Long complaintId, UserDto student, Integer rating, String comment, LocalDateTime createdAt) {
        this.id = id;
        this.complaintId = complaintId;
        this.student = student;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
    }

    public static FeedbackDtoBuilder builder() {
        return new FeedbackDtoBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getComplaintId() { return complaintId; }
    public void setComplaintId(Long complaintId) { this.complaintId = complaintId; }

    public UserDto getStudent() { return student; }
    public void setStudent(UserDto student) { this.student = student; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class FeedbackDtoBuilder {
        private Long id;
        private Long complaintId;
        private UserDto student;
        private Integer rating;
        private String comment;
        private LocalDateTime createdAt;

        public FeedbackDtoBuilder id(Long id) { this.id = id; return this; }
        public FeedbackDtoBuilder complaintId(Long complaintId) { this.complaintId = complaintId; return this; }
        public FeedbackDtoBuilder student(UserDto student) { this.student = student; return this; }
        public FeedbackDtoBuilder rating(Integer rating) { this.rating = rating; return this; }
        public FeedbackDtoBuilder comment(String comment) { this.comment = comment; return this; }
        public FeedbackDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public FeedbackDto build() {
            return new FeedbackDto(id, complaintId, student, rating, comment, createdAt);
        }
    }
}
