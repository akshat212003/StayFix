package com.stayfix.dto;

public class StaffPerformanceDto {
    private Long staffId;
    private String staffName;
    private String email;
    private Long assignedCount;
    private Long resolvedCount;
    private Long pendingCount;
    private Double avgRating;

    public StaffPerformanceDto() {}

    public StaffPerformanceDto(Long staffId, String staffName, String email, Long assignedCount, Long resolvedCount, Long pendingCount, Double avgRating) {
        this.staffId = staffId;
        this.staffName = staffName;
        this.email = email;
        this.assignedCount = assignedCount;
        this.resolvedCount = resolvedCount;
        this.pendingCount = pendingCount;
        this.avgRating = avgRating;
    }

    public static StaffPerformanceDtoBuilder builder() {
        return new StaffPerformanceDtoBuilder();
    }

    public Long getStaffId() { return staffId; }
    public void setStaffId(Long staffId) { this.staffId = staffId; }

    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getAssignedCount() { return assignedCount; }
    public void setAssignedCount(Long assignedCount) { this.assignedCount = assignedCount; }

    public Long getResolvedCount() { return resolvedCount; }
    public void setResolvedCount(Long resolvedCount) { this.resolvedCount = resolvedCount; }

    public Long getPendingCount() { return pendingCount; }
    public void setPendingCount(Long pendingCount) { this.pendingCount = pendingCount; }

    public Double getAvgRating() { return avgRating; }
    public void setAvgRating(Double avgRating) { this.avgRating = avgRating; }

    public static class StaffPerformanceDtoBuilder {
        private Long staffId;
        private String staffName;
        private String email;
        private Long assignedCount;
        private Long resolvedCount;
        private Long pendingCount;
        private Double avgRating;

        public StaffPerformanceDtoBuilder staffId(Long staffId) { this.staffId = staffId; return this; }
        public StaffPerformanceDtoBuilder staffName(String staffName) { this.staffName = staffName; return this; }
        public StaffPerformanceDtoBuilder email(String email) { this.email = email; return this; }
        public StaffPerformanceDtoBuilder assignedCount(Long assignedCount) { this.assignedCount = assignedCount; return this; }
        public StaffPerformanceDtoBuilder resolvedCount(Long resolvedCount) { this.resolvedCount = resolvedCount; return this; }
        public StaffPerformanceDtoBuilder pendingCount(Long pendingCount) { this.pendingCount = pendingCount; return this; }
        public StaffPerformanceDtoBuilder avgRating(Double avgRating) { this.avgRating = avgRating; return this; }

        public StaffPerformanceDto build() {
            return new StaffPerformanceDto(staffId, staffName, email, assignedCount, resolvedCount, pendingCount, avgRating);
        }
    }
}
