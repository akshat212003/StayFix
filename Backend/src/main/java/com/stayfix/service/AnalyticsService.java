package com.stayfix.service;

import com.stayfix.dto.*;
import com.stayfix.entity.Complaint;
import com.stayfix.enum_.Category;
import com.stayfix.enum_.Status;
import com.stayfix.repository.ComplaintRepository;
import com.stayfix.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final ComplaintRepository complaintRepository;
    private final FeedbackRepository feedbackRepository;

    public AnalyticsService(ComplaintRepository complaintRepository, FeedbackRepository feedbackRepository) {
        this.complaintRepository = complaintRepository;
        this.feedbackRepository = feedbackRepository;
    }

    public DashboardAnalyticsDto getAdminDashboardAnalytics() {
        long total = complaintRepository.count();
        long pending = complaintRepository.countByStatus(Status.PENDING);
        long assigned = complaintRepository.countByStatus(Status.ASSIGNED);
        long inProgress = complaintRepository.countByStatus(Status.IN_PROGRESS);
        long resolved = complaintRepository.countByStatus(Status.RESOLVED);
        long closed = complaintRepository.countByStatus(Status.CLOSED);

        List<Complaint> resolvedComplaints = complaintRepository.findByStatus(Status.RESOLVED);
        resolvedComplaints.addAll(complaintRepository.findByStatus(Status.CLOSED));

        double avgResolutionTimeHours = 0.0;
        if (!resolvedComplaints.isEmpty()) {
            long totalMinutes = 0;
            int count = 0;
            for (Complaint c : resolvedComplaints) {
                if (c.getCreatedAt() != null && c.getResolvedAt() != null) {
                    totalMinutes += Duration.between(c.getCreatedAt(), c.getResolvedAt()).toMinutes();
                    count++;
                }
            }
            if (count > 0) {
                avgResolutionTimeHours = Math.round((totalMinutes / 60.0 / count) * 10.0) / 10.0;
            }
        }

        Double avgRating = feedbackRepository.getAverageSystemRating();
        double roundedRating = avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 0.0;

        List<Object[]> rawCategoryData = complaintRepository.countComplaintsByCategory();
        Map<Category, Long> categoryCountMap = new EnumMap<>(Category.class);
        for (Category cat : Category.values()) {
            categoryCountMap.put(cat, 0L);
        }
        for (Object[] row : rawCategoryData) {
            Category cat = (Category) row[0];
            Long count = (Long) row[1];
            categoryCountMap.put(cat, count);
        }
        List<CategoryAnalyticsDto> categoryDistribution = categoryCountMap.entrySet().stream()
                .map(e -> new CategoryAnalyticsDto(e.getKey(), e.getValue()))
                .collect(Collectors.toList());

        List<Object[]> rawStaffMetrics = complaintRepository.getStaffPerformanceMetrics();
        List<StaffPerformanceDto> staffPerformance = new ArrayList<>();
        for (Object[] row : rawStaffMetrics) {
            Long staffId = (Long) row[0];
            String name = (String) row[1];
            String email = (String) row[2];
            Long totalAssigned = (Long) row[3];
            Long totalResolved = (Long) row[4];
            Long totalPending = (Long) row[5];

            Double staffRating = feedbackRepository.getAverageStaffRating(staffId);
            double roundedStaffRating = staffRating != null ? Math.round(staffRating * 10.0) / 10.0 : 0.0;

            staffPerformance.add(StaffPerformanceDto.builder()
                    .staffId(staffId)
                    .staffName(name)
                    .email(email)
                    .assignedCount(totalAssigned)
                    .resolvedCount(totalResolved)
                    .pendingCount(totalPending)
                    .avgRating(roundedStaffRating)
                    .build());
        }

        List<Complaint> allComplaints = complaintRepository.findAll();
        Map<String, long[]> monthMap = new LinkedHashMap<>();

        for (Complaint c : allComplaints) {
            if (c.getCreatedAt() != null) {
                String monthName = c.getCreatedAt().getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
                monthMap.putIfAbsent(monthName, new long[]{0, 0});
                monthMap.get(monthName)[0]++;
                if (c.getStatus() == Status.RESOLVED || c.getStatus() == Status.CLOSED) {
                    monthMap.get(monthName)[1]++;
                }
            }
        }

        List<MonthlyTrendDto> monthlyTrends = monthMap.entrySet().stream()
                .map(e -> new MonthlyTrendDto(e.getKey(), e.getValue()[0], e.getValue()[1]))
                .collect(Collectors.toList());

        return DashboardAnalyticsDto.builder()
                .totalComplaints(total)
                .pendingComplaints(pending)
                .assignedComplaints(assigned)
                .inProgressComplaints(inProgress)
                .resolvedComplaints(resolved)
                .closedComplaints(closed)
                .avgResolutionTimeHours(avgResolutionTimeHours)
                .avgSatisfactionRating(roundedRating)
                .categoryDistribution(categoryDistribution)
                .staffPerformance(staffPerformance)
                .monthlyTrends(monthlyTrends)
                .build();
    }
}
