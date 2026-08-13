package com.stayfix.dto;

import com.stayfix.enum_.Status;
import java.time.LocalDateTime;

public class ComplaintHistoryDto {
    private Long id;
    private UserDto updatedBy;
    private Status previousStatus;
    private Status newStatus;
    private String remark;
    private LocalDateTime timestamp;

    public ComplaintHistoryDto() {}

    public ComplaintHistoryDto(Long id, UserDto updatedBy, Status previousStatus, Status newStatus, String remark, LocalDateTime timestamp) {
        this.id = id;
        this.updatedBy = updatedBy;
        this.previousStatus = previousStatus;
        this.newStatus = newStatus;
        this.remark = remark;
        this.timestamp = timestamp;
    }

    public static ComplaintHistoryDtoBuilder builder() {
        return new ComplaintHistoryDtoBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserDto getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(UserDto updatedBy) { this.updatedBy = updatedBy; }

    public Status getPreviousStatus() { return previousStatus; }
    public void setPreviousStatus(Status previousStatus) { this.previousStatus = previousStatus; }

    public Status getNewStatus() { return newStatus; }
    public void setNewStatus(Status newStatus) { this.newStatus = newStatus; }

    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public static class ComplaintHistoryDtoBuilder {
        private Long id;
        private UserDto updatedBy;
        private Status previousStatus;
        private Status newStatus;
        private String remark;
        private LocalDateTime timestamp;

        public ComplaintHistoryDtoBuilder id(Long id) { this.id = id; return this; }
        public ComplaintHistoryDtoBuilder updatedBy(UserDto updatedBy) { this.updatedBy = updatedBy; return this; }
        public ComplaintHistoryDtoBuilder previousStatus(Status previousStatus) { this.previousStatus = previousStatus; return this; }
        public ComplaintHistoryDtoBuilder newStatus(Status newStatus) { this.newStatus = newStatus; return this; }
        public ComplaintHistoryDtoBuilder remark(String remark) { this.remark = remark; return this; }
        public ComplaintHistoryDtoBuilder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }

        public ComplaintHistoryDto build() {
            return new ComplaintHistoryDto(id, updatedBy, previousStatus, newStatus, remark, timestamp);
        }
    }
}
