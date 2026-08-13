package com.stayfix.service;

import com.stayfix.dto.*;
import com.stayfix.entity.*;
import com.stayfix.enum_.*;
import com.stayfix.exception.BadRequestException;
import com.stayfix.exception.ResourceNotFoundException;
import com.stayfix.exception.UnauthorizedException;
import com.stayfix.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final ComplaintImageRepository complaintImageRepository;
    private final ComplaintHistoryRepository complaintHistoryRepository;
    private final FileStorageService fileStorageService;
    private final NotificationMailService notificationMailService;
    private final AuthService authService;

    public ComplaintService(ComplaintRepository complaintRepository,
                            UserRepository userRepository,
                            ComplaintImageRepository complaintImageRepository,
                            ComplaintHistoryRepository complaintHistoryRepository,
                            FileStorageService fileStorageService,
                            NotificationMailService notificationMailService,
                            AuthService authService) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.complaintImageRepository = complaintImageRepository;
        this.complaintHistoryRepository = complaintHistoryRepository;
        this.fileStorageService = fileStorageService;
        this.notificationMailService = notificationMailService;
        this.authService = authService;
    }

    @Transactional
    public ComplaintDto createComplaint(Long studentId, ComplaintRequest request, List<MultipartFile> images) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        Complaint complaint = Complaint.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .priority(request.getPriority() != null ? request.getPriority() : Priority.MEDIUM)
                .status(Status.PENDING)
                .student(student)
                .build();

        Complaint savedComplaint = complaintRepository.save(complaint);

        // Upload initial issue images
        if (images != null && !images.isEmpty()) {
            for (MultipartFile file : images) {
                if (file != null && !file.isEmpty()) {
                    String imageUrl = fileStorageService.storeFile(file);
                    ComplaintImage img = ComplaintImage.builder()
                            .complaint(savedComplaint)
                            .imageUrl(imageUrl)
                            .imageType(ImageType.ISSUE)
                            .build();
                    complaintImageRepository.save(img);
                }
            }
        }

        // Record History Log
        createHistoryLog(savedComplaint, student, null, Status.PENDING, "Complaint created by student.");

        // Async Email Notification
        notificationMailService.sendComplaintCreatedNotification(savedComplaint);

        return mapToDto(complaintRepository.findById(savedComplaint.getId()).orElse(savedComplaint));
    }

    public List<ComplaintDto> getStudentComplaints(Long studentId, Status status, String keyword) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        return complaintRepository.searchStudentComplaints(student, status, keyword).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ComplaintDto> getStaffAssignedComplaints(Long staffId, Status status, String keyword) {
        User staff = userRepository.findById(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff member not found"));
        return complaintRepository.searchStaffComplaints(staff, status, keyword).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ComplaintDto> getAllComplaints(Status status, Category category, String keyword) {
        return complaintRepository.searchComplaints(status, category, keyword).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ComplaintDto getComplaintById(Long complaintId, User currentUser) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with id: " + complaintId));

        String role = currentUser.getRole().getName().name();
        if ("ROLE_STUDENT".equals(role) && !complaint.getStudent().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You can only view your own complaints.");
        }
        if ("ROLE_STAFF".equals(role) && (complaint.getAssignedStaff() == null || !complaint.getAssignedStaff().getId().equals(currentUser.getId()))) {
            throw new UnauthorizedException("You can only view complaints assigned to you.");
        }

        return mapToDto(complaint);
    }

    @Transactional
    public ComplaintDto assignComplaint(Long complaintId, AssignComplaintRequest request, User adminUser) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        User staff = userRepository.findById(request.getStaffId())
                .orElseThrow(() -> new ResourceNotFoundException("Staff member not found"));

        if (!RoleType.ROLE_STAFF.equals(staff.getRole().getName())) {
            throw new BadRequestException("Assigned user must have ROLE_STAFF role");
        }

        Status oldStatus = complaint.getStatus();
        complaint.setAssignedStaff(staff);
        complaint.setStatus(Status.ASSIGNED);
        if (request.getPriority() != null) {
            complaint.setPriority(request.getPriority());
        }

        Complaint saved = complaintRepository.save(complaint);

        createHistoryLog(saved, adminUser, oldStatus, Status.ASSIGNED, "Assigned to staff: " + staff.getFullName());

        notificationMailService.sendComplaintAssignedNotification(saved);

        return mapToDto(saved);
    }

    @Transactional
    public ComplaintDto updateComplaintStatus(Long complaintId, UpdateStatusRequest request, List<MultipartFile> proofImages, User currentUser) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        Status oldStatus = complaint.getStatus();
        Status newStatus = request.getStatus();

        validateStatusTransition(oldStatus, newStatus);

        complaint.setStatus(newStatus);
        if (request.getRemarks() != null && !request.getRemarks().isBlank()) {
            complaint.setStaffRemarks(request.getRemarks());
        }

        if (newStatus == Status.RESOLVED) {
            complaint.setResolvedAt(LocalDateTime.now());
        }

        Complaint saved = complaintRepository.save(complaint);

        if (proofImages != null && !proofImages.isEmpty()) {
            for (MultipartFile file : proofImages) {
                if (file != null && !file.isEmpty()) {
                    String imageUrl = fileStorageService.storeFile(file);
                    ComplaintImage img = ComplaintImage.builder()
                            .complaint(saved)
                            .imageUrl(imageUrl)
                            .imageType(ImageType.RESOLUTION_PROOF)
                            .build();
                    complaintImageRepository.save(img);
                }
            }
        }

        createHistoryLog(saved, currentUser, oldStatus, newStatus, request.getRemarks());

        notificationMailService.sendStatusUpdateNotification(saved, oldStatus.name());

        return mapToDto(complaintRepository.findById(saved.getId()).orElse(saved));
    }

    private void validateStatusTransition(Status current, Status target) {
        if (current == target) return;

        if (current == Status.PENDING && (target != Status.ASSIGNED && target != Status.CLOSED)) {
            throw new BadRequestException("Pending complaint must be Assigned before starting progress.");
        }
        if (current == Status.ASSIGNED && (target != Status.IN_PROGRESS && target != Status.CLOSED)) {
            throw new BadRequestException("Assigned complaint must move to In Progress state.");
        }
        if (current == Status.IN_PROGRESS && (target != Status.RESOLVED && target != Status.CLOSED)) {
            throw new BadRequestException("In-progress complaint must move to Resolved state.");
        }
        if (current == Status.RESOLVED && target != Status.CLOSED) {
            throw new BadRequestException("Resolved complaint can only be Closed.");
        }
        if (current == Status.CLOSED) {
            throw new BadRequestException("Closed complaints cannot change status.");
        }
    }

    private void createHistoryLog(Complaint complaint, User updatedBy, Status oldStatus, Status newStatus, String remark) {
        ComplaintHistory history = ComplaintHistory.builder()
                .complaint(complaint)
                .updatedBy(updatedBy)
                .previousStatus(oldStatus)
                .newStatus(newStatus)
                .remark(remark)
                .build();
        complaintHistoryRepository.save(history);
    }

    public ComplaintDto mapToDto(Complaint complaint) {
        List<ComplaintImageDto> images = complaintImageRepository.findByComplaint(complaint).stream()
                .map(img -> ComplaintImageDto.builder()
                        .id(img.getId())
                        .imageUrl(img.getImageUrl())
                        .imageType(img.getImageType())
                        .uploadedAt(img.getUploadedAt())
                        .build())
                .collect(Collectors.toList());

        List<ComplaintHistoryDto> history = complaintHistoryRepository.findByComplaintOrderByTimestampDesc(complaint).stream()
                .map(h -> ComplaintHistoryDto.builder()
                        .id(h.getId())
                        .updatedBy(authService.mapToUserDto(h.getUpdatedBy()))
                        .previousStatus(h.getPreviousStatus())
                        .newStatus(h.getNewStatus())
                        .remark(h.getRemark())
                        .timestamp(h.getTimestamp())
                        .build())
                .collect(Collectors.toList());

        FeedbackDto feedbackDto = null;
        if (complaint.getFeedback() != null) {
            feedbackDto = FeedbackDto.builder()
                    .id(complaint.getFeedback().getId())
                    .complaintId(complaint.getId())
                    .student(authService.mapToUserDto(complaint.getFeedback().getStudent()))
                    .rating(complaint.getFeedback().getRating())
                    .comment(complaint.getFeedback().getComment())
                    .createdAt(complaint.getFeedback().getCreatedAt())
                    .build();
        }

        return ComplaintDto.builder()
                .id(complaint.getId())
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .category(complaint.getCategory())
                .priority(complaint.getPriority())
                .status(complaint.getStatus())
                .student(authService.mapToUserDto(complaint.getStudent()))
                .assignedStaff(complaint.getAssignedStaff() != null ? authService.mapToUserDto(complaint.getAssignedStaff()) : null)
                .staffRemarks(complaint.getStaffRemarks())
                .createdAt(complaint.getCreatedAt())
                .updatedAt(complaint.getUpdatedAt())
                .resolvedAt(complaint.getResolvedAt())
                .images(images)
                .historyList(history)
                .feedback(feedbackDto)
                .build();
    }
}
