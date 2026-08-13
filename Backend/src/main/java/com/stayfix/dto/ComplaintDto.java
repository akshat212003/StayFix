package com.stayfix.dto;

import com.stayfix.enum_.Category;
import com.stayfix.enum_.Priority;
import com.stayfix.enum_.Status;

import java.time.LocalDateTime;
import java.util.List;

public class ComplaintDto {
    private Long id;
    private String title;
    private String description;
    private Category category;
    private Priority priority;
    private Status status;
    private UserDto student;
    private UserDto assignedStaff;
    private String staffRemarks;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime resolvedAt;
    private List<ComplaintImageDto> images;
    private List<ComplaintHistoryDto> historyList;
    private FeedbackDto feedback;

    public ComplaintDto() {}

    public ComplaintDto(Long id, String title, String description, Category category, Priority priority, Status status, UserDto student, UserDto assignedStaff, String staffRemarks, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime resolvedAt, List<ComplaintImageDto> images, List<ComplaintHistoryDto> historyList, FeedbackDto feedback) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.status = status;
        this.student = student;
        this.assignedStaff = assignedStaff;
        this.staffRemarks = staffRemarks;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.resolvedAt = resolvedAt;
        this.images = images;
        this.historyList = historyList;
        this.feedback = feedback;
    }

    public static ComplaintDtoBuilder builder() {
        return new ComplaintDtoBuilder();
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

    public UserDto getStudent() { return student; }
    public void setStudent(UserDto student) { this.student = student; }

    public UserDto getAssignedStaff() { return assignedStaff; }
    public void setAssignedStaff(UserDto assignedStaff) { this.assignedStaff = assignedStaff; }

    public String getStaffRemarks() { return staffRemarks; }
    public void setStaffRemarks(String staffRemarks) { this.staffRemarks = staffRemarks; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }

    public List<ComplaintImageDto> getImages() { return images; }
    public void setImages(List<ComplaintImageDto> images) { this.images = images; }

    public List<ComplaintHistoryDto> getHistoryList() { return historyList; }
    public void setHistoryList(List<ComplaintHistoryDto> historyList) { this.historyList = historyList; }

    public FeedbackDto getFeedback() { return feedback; }
    public void setFeedback(FeedbackDto feedback) { this.feedback = feedback; }

    public static class ComplaintDtoBuilder {
        private Long id;
        private String title;
        private String description;
        private Category category;
        private Priority priority;
        private Status status;
        private UserDto student;
        private UserDto assignedStaff;
        private String staffRemarks;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private LocalDateTime resolvedAt;
        private List<ComplaintImageDto> images;
        private List<ComplaintHistoryDto> historyList;
        private FeedbackDto feedback;

        public ComplaintDtoBuilder id(Long id) { this.id = id; return this; }
        public ComplaintDtoBuilder title(String title) { this.title = title; return this; }
        public ComplaintDtoBuilder description(String description) { this.description = description; return this; }
        public ComplaintDtoBuilder category(Category category) { this.category = category; return this; }
        public ComplaintDtoBuilder priority(Priority priority) { this.priority = priority; return this; }
        public ComplaintDtoBuilder status(Status status) { this.status = status; return this; }
        public ComplaintDtoBuilder student(UserDto student) { this.student = student; return this; }
        public ComplaintDtoBuilder assignedStaff(UserDto assignedStaff) { this.assignedStaff = assignedStaff; return this; }
        public ComplaintDtoBuilder staffRemarks(String staffRemarks) { this.staffRemarks = staffRemarks; return this; }
        public ComplaintDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ComplaintDtoBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        public ComplaintDtoBuilder resolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; return this; }
        public ComplaintDtoBuilder images(List<ComplaintImageDto> images) { this.images = images; return this; }
        public ComplaintDtoBuilder historyList(List<ComplaintHistoryDto> historyList) { this.historyList = historyList; return this; }
        public ComplaintDtoBuilder feedback(FeedbackDto feedback) { this.feedback = feedback; return this; }

        public ComplaintDto build() {
            return new ComplaintDto(id, title, description, category, priority, status, student, assignedStaff, staffRemarks, createdAt, updatedAt, resolvedAt, images, historyList, feedback);
        }
    }
}
