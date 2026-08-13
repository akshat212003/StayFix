package com.stayfix.service;

import com.stayfix.dto.FeedbackDto;
import com.stayfix.dto.FeedbackRequest;
import com.stayfix.entity.Complaint;
import com.stayfix.entity.Feedback;
import com.stayfix.entity.User;
import com.stayfix.enum_.Status;
import com.stayfix.exception.BadRequestException;
import com.stayfix.exception.ResourceNotFoundException;
import com.stayfix.exception.UnauthorizedException;
import com.stayfix.repository.ComplaintRepository;
import com.stayfix.repository.FeedbackRepository;
import com.stayfix.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    public FeedbackService(FeedbackRepository feedbackRepository,
                           ComplaintRepository complaintRepository,
                           UserRepository userRepository,
                           AuthService authService) {
        this.feedbackRepository = feedbackRepository;
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    public FeedbackDto submitFeedback(Long complaintId, Long studentId, FeedbackRequest request) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        if (!complaint.getStudent().getId().equals(studentId)) {
            throw new UnauthorizedException("You can only submit feedback for your own complaints.");
        }

        if (complaint.getStatus() != Status.RESOLVED && complaint.getStatus() != Status.CLOSED) {
            throw new BadRequestException("Feedback can only be submitted after complaint is resolved or closed.");
        }

        if (complaint.getFeedback() != null) {
            throw new BadRequestException("Feedback has already been submitted for this complaint.");
        }

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        Feedback feedback = Feedback.builder()
                .complaint(complaint)
                .student(student)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        Feedback saved = feedbackRepository.save(feedback);
        return mapToDto(saved);
    }

    public FeedbackDto getFeedbackByComplaint(Long complaintId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        Feedback feedback = feedbackRepository.findByComplaint(complaint)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found for this complaint"));

        return mapToDto(feedback);
    }

    public List<FeedbackDto> getAllFeedbacks() {
        return feedbackRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private FeedbackDto mapToDto(Feedback feedback) {
        return FeedbackDto.builder()
                .id(feedback.getId())
                .complaintId(feedback.getComplaint().getId())
                .student(authService.mapToUserDto(feedback.getStudent()))
                .rating(feedback.getRating())
                .comment(feedback.getComment())
                .createdAt(feedback.getCreatedAt())
                .build();
    }
}
