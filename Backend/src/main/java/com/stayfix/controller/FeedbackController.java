package com.stayfix.controller;

import com.stayfix.dto.ApiResponse;
import com.stayfix.dto.FeedbackDto;
import com.stayfix.dto.FeedbackRequest;
import com.stayfix.security.UserDetailsImpl;
import com.stayfix.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/complaints/{complaintId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<FeedbackDto>> submitFeedback(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long complaintId,
            @Valid @RequestBody FeedbackRequest request) {

        FeedbackDto feedback = feedbackService.submitFeedback(complaintId, userDetails.getId(), request);
        return new ResponseEntity<>(ApiResponse.success("Feedback submitted successfully", feedback), HttpStatus.CREATED);
    }

    @GetMapping("/complaints/{complaintId}")
    public ResponseEntity<ApiResponse<FeedbackDto>> getFeedbackByComplaint(@PathVariable Long complaintId) {
        FeedbackDto feedback = feedbackService.getFeedbackByComplaint(complaintId);
        return ResponseEntity.ok(ApiResponse.success("Feedback retrieved", feedback));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<FeedbackDto>>> getAllFeedbacks() {
        List<FeedbackDto> feedbacks = feedbackService.getAllFeedbacks();
        return ResponseEntity.ok(ApiResponse.success("All feedbacks retrieved", feedbacks));
    }
}
