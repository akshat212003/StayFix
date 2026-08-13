package com.stayfix.controller;

import com.stayfix.dto.ApiResponse;
import com.stayfix.dto.ComplaintDto;
import com.stayfix.dto.ComplaintRequest;
import com.stayfix.entity.User;
import com.stayfix.enum_.Category;
import com.stayfix.enum_.Priority;
import com.stayfix.enum_.Status;
import com.stayfix.repository.UserRepository;
import com.stayfix.security.UserDetailsImpl;
import com.stayfix.service.ComplaintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;
    private final UserRepository userRepository;

    public ComplaintController(ComplaintService complaintService, UserRepository userRepository) {
        this.complaintService = complaintService;
        this.userRepository = userRepository;
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<ComplaintDto>> createComplaint(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("category") Category category,
            @RequestParam("priority") Priority priority,
            @RequestParam(value = "images", required = false) List<MultipartFile> images) {

        ComplaintRequest request = new ComplaintRequest(title, description, category, priority);
        ComplaintDto created = complaintService.createComplaint(userDetails.getId(), request, images);
        return new ResponseEntity<>(ApiResponse.success("Complaint created successfully", created), HttpStatus.CREATED);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<ComplaintDto>>> getMyComplaints(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) String keyword) {

        List<ComplaintDto> complaints = complaintService.getStudentComplaints(userDetails.getId(), status, keyword);
        return ResponseEntity.ok(ApiResponse.success("My complaints retrieved", complaints));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ComplaintDto>> getComplaintById(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {

        User currentUser = userRepository.findById(userDetails.getId()).orElseThrow();
        ComplaintDto complaint = complaintService.getComplaintById(id, currentUser);
        return ResponseEntity.ok(ApiResponse.success("Complaint details retrieved", complaint));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ComplaintDto>>> getAllComplaints(
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) String keyword) {

        List<ComplaintDto> complaints = complaintService.getAllComplaints(status, category, keyword);
        return ResponseEntity.ok(ApiResponse.success("All complaints retrieved", complaints));
    }
}
