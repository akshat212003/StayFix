package com.stayfix.controller;

import com.stayfix.dto.ApiResponse;
import com.stayfix.dto.ComplaintDto;
import com.stayfix.dto.UpdateStatusRequest;
import com.stayfix.entity.User;
import com.stayfix.enum_.Status;
import com.stayfix.repository.UserRepository;
import com.stayfix.security.UserDetailsImpl;
import com.stayfix.service.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@PreAuthorize("hasRole('STAFF')")
public class StaffController {

    private final ComplaintService complaintService;
    private final UserRepository userRepository;

    public StaffController(ComplaintService complaintService, UserRepository userRepository) {
        this.complaintService = complaintService;
        this.userRepository = userRepository;
    }

    @GetMapping("/complaints")
    public ResponseEntity<ApiResponse<List<ComplaintDto>>> getAssignedComplaints(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) String keyword) {

        List<ComplaintDto> complaints = complaintService.getStaffAssignedComplaints(userDetails.getId(), status, keyword);
        return ResponseEntity.ok(ApiResponse.success("Assigned complaints retrieved", complaints));
    }

    @PutMapping("/complaints/{id}/status")
    public ResponseEntity<ApiResponse<ComplaintDto>> updateStatus(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id,
            @RequestParam("status") Status status,
            @RequestParam(value = "remarks", required = false) String remarks,
            @RequestParam(value = "proofImages", required = false) List<MultipartFile> proofImages) {

        UpdateStatusRequest request = new UpdateStatusRequest(status, remarks);
        User currentUser = userRepository.findById(userDetails.getId()).orElseThrow();
        ComplaintDto updated = complaintService.updateComplaintStatus(id, request, proofImages, currentUser);
        return ResponseEntity.ok(ApiResponse.success("Complaint status updated successfully", updated));
    }
}
