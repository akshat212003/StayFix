package com.stayfix.controller;

import com.stayfix.dto.*;
import com.stayfix.entity.User;
import com.stayfix.repository.UserRepository;
import com.stayfix.security.UserDetailsImpl;
import com.stayfix.service.AnalyticsService;
import com.stayfix.service.AuthService;
import com.stayfix.service.ComplaintService;
import com.stayfix.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ComplaintService complaintService;
    private final UserService userService;
    private final AuthService authService;
    private final AnalyticsService analyticsService;
    private final UserRepository userRepository;

    public AdminController(ComplaintService complaintService,
                           UserService userService,
                           AuthService authService,
                           AnalyticsService analyticsService,
                           UserRepository userRepository) {
        this.complaintService = complaintService;
        this.userService = userService;
        this.authService = authService;
        this.analyticsService = analyticsService;
        this.userRepository = userRepository;
    }

    @PutMapping("/complaints/{id}/assign")
    public ResponseEntity<ApiResponse<ComplaintDto>> assignComplaint(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id,
            @Valid @RequestBody AssignComplaintRequest request) {

        User adminUser = userRepository.findById(userDetails.getId()).orElseThrow();
        ComplaintDto updated = complaintService.assignComplaint(id, request, adminUser);
        return ResponseEntity.ok(ApiResponse.success("Complaint assigned successfully", updated));
    }

    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<DashboardAnalyticsDto>> getAnalytics() {
        DashboardAnalyticsDto analytics = analyticsService.getAdminDashboardAnalytics();
        return ResponseEntity.ok(ApiResponse.success("Admin dashboard analytics retrieved", analytics));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success("Users retrieved", users));
    }

    @PostMapping("/users")
    public ResponseEntity<ApiResponse<UserDto>> createUser(@Valid @RequestBody RegisterRequest request) {
        UserDto created = authService.registerUser(request);
        return new ResponseEntity<>(ApiResponse.success("User created successfully", created), HttpStatus.CREATED);
    }

    @PatchMapping("/users/{id}/toggle-status")
    public ResponseEntity<ApiResponse<UserDto>> toggleUserStatus(@PathVariable Long id) {
        UserDto updated = userService.toggleUserActiveStatus(id);
        return ResponseEntity.ok(ApiResponse.success("User active status updated", updated));
    }
}
