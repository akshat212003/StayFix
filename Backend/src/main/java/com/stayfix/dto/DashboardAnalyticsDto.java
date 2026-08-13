package com.stayfix.dto;

import java.util.List;

public class DashboardAnalyticsDto {
    private Long totalComplaints;
    private Long pendingComplaints;
    private Long assignedComplaints;
    private Long inProgressComplaints;
    private Long resolvedComplaints;
    private Long closedComplaints;
    private Double avgResolutionTimeHours;
    private Double avgSatisfactionRating;
    private List<CategoryAnalyticsDto> categoryDistribution;
    private List<StaffPerformanceDto> staffPerformance;
    private List<MonthlyTrendDto> monthlyTrends;

    public DashboardAnalyticsDto() {}

    public DashboardAnalyticsDto(Long totalComplaints, Long pendingComplaints, Long assignedComplaints, Long inProgressComplaints, Long resolvedComplaints, Long closedComplaints, Double avgResolutionTimeHours, Double avgSatisfactionRating, List<CategoryAnalyticsDto> categoryDistribution, List<StaffPerformanceDto> staffPerformance, List<MonthlyTrendDto> monthlyTrends) {
        this.totalComplaints = totalComplaints;
        this.pendingComplaints = pendingComplaints;
        this.assignedComplaints = assignedComplaints;
        this.inProgressComplaints = inProgressComplaints;
        this.resolvedComplaints = resolvedComplaints;
        this.closedComplaints = closedComplaints;
        this.avgResolutionTimeHours = avgResolutionTimeHours;
        this.avgSatisfactionRating = avgSatisfactionRating;
        this.categoryDistribution = categoryDistribution;
        this.staffPerformance = staffPerformance;
        this.monthlyTrends = monthlyTrends;
    }

    public static DashboardAnalyticsDtoBuilder builder() {
        return new DashboardAnalyticsDtoBuilder();
    }

    public Long getTotalComplaints() { return totalComplaints; }
    public void setTotalComplaints(Long totalComplaints) { this.totalComplaints = totalComplaints; }

    public Long getPendingComplaints() { return pendingComplaints; }
    public void setPendingComplaints(Long pendingComplaints) { this.pendingComplaints = pendingComplaints; }

    public Long getAssignedComplaints() { return assignedComplaints; }
    public void setAssignedComplaints(Long assignedComplaints) { this.assignedComplaints = assignedComplaints; }

    public Long getInProgressComplaints() { return inProgressComplaints; }
    public void setInProgressComplaints(Long inProgressComplaints) { this.inProgressComplaints = inProgressComplaints; }

    public Long getResolvedComplaints() { return resolvedComplaints; }
    public void setResolvedComplaints(Long resolvedComplaints) { this.resolvedComplaints = resolvedComplaints; }

    public Long getClosedComplaints() { return closedComplaints; }
    public void setClosedComplaints(Long closedComplaints) { this.closedComplaints = closedComplaints; }

    public Double getAvgResolutionTimeHours() { return avgResolutionTimeHours; }
    public void setAvgResolutionTimeHours(Double avgResolutionTimeHours) { this.avgResolutionTimeHours = avgResolutionTimeHours; }

    public Double getAvgSatisfactionRating() { return avgSatisfactionRating; }
    public void setAvgSatisfactionRating(Double avgSatisfactionRating) { this.avgSatisfactionRating = avgSatisfactionRating; }

    public List<CategoryAnalyticsDto> getCategoryDistribution() { return categoryDistribution; }
    public void setCategoryDistribution(List<CategoryAnalyticsDto> categoryDistribution) { this.categoryDistribution = categoryDistribution; }

    public List<StaffPerformanceDto> getStaffPerformance() { return staffPerformance; }
    public void setStaffPerformance(List<StaffPerformanceDto> staffPerformance) { this.staffPerformance = staffPerformance; }

    public List<MonthlyTrendDto> getMonthlyTrends() { return monthlyTrends; }
    public void setMonthlyTrends(List<MonthlyTrendDto> monthlyTrends) { this.monthlyTrends = monthlyTrends; }

    public static class DashboardAnalyticsDtoBuilder {
        private Long totalComplaints;
        private Long pendingComplaints;
        private Long assignedComplaints;
        private Long inProgressComplaints;
        private Long resolvedComplaints;
        private Long closedComplaints;
        private Double avgResolutionTimeHours;
        private Double avgSatisfactionRating;
        private List<CategoryAnalyticsDto> categoryDistribution;
        private List<StaffPerformanceDto> staffPerformance;
        private List<MonthlyTrendDto> monthlyTrends;

        public DashboardAnalyticsDtoBuilder totalComplaints(Long totalComplaints) { this.totalComplaints = totalComplaints; return this; }
        public DashboardAnalyticsDtoBuilder pendingComplaints(Long pendingComplaints) { this.pendingComplaints = pendingComplaints; return this; }
        public DashboardAnalyticsDtoBuilder assignedComplaints(Long assignedComplaints) { this.assignedComplaints = assignedComplaints; return this; }
        public DashboardAnalyticsDtoBuilder inProgressComplaints(Long inProgressComplaints) { this.inProgressComplaints = inProgressComplaints; return this; }
        public DashboardAnalyticsDtoBuilder resolvedComplaints(Long resolvedComplaints) { this.resolvedComplaints = resolvedComplaints; return this; }
        public DashboardAnalyticsDtoBuilder closedComplaints(Long closedComplaints) { this.closedComplaints = closedComplaints; return this; }
        public DashboardAnalyticsDtoBuilder avgResolutionTimeHours(Double avgResolutionTimeHours) { this.avgResolutionTimeHours = avgResolutionTimeHours; return this; }
        public DashboardAnalyticsDtoBuilder avgSatisfactionRating(Double avgSatisfactionRating) { this.avgSatisfactionRating = avgSatisfactionRating; return this; }
        public DashboardAnalyticsDtoBuilder categoryDistribution(List<CategoryAnalyticsDto> categoryDistribution) { this.categoryDistribution = categoryDistribution; return this; }
        public DashboardAnalyticsDtoBuilder staffPerformance(List<StaffPerformanceDto> staffPerformance) { this.staffPerformance = staffPerformance; return this; }
        public DashboardAnalyticsDtoBuilder monthlyTrends(List<MonthlyTrendDto> monthlyTrends) { this.monthlyTrends = monthlyTrends; return this; }

        public DashboardAnalyticsDto build() {
            return new DashboardAnalyticsDto(totalComplaints, pendingComplaints, assignedComplaints, inProgressComplaints, resolvedComplaints, closedComplaints, avgResolutionTimeHours, avgSatisfactionRating, categoryDistribution, staffPerformance, monthlyTrends);
        }
    }
}
