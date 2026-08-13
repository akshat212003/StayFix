package com.stayfix.controller;

import com.stayfix.dto.ApiResponse;
import com.stayfix.dto.UpdateProfileRequest;
import com.stayfix.dto.UserDto;
import com.stayfix.security.UserDetailsImpl;
import com.stayfix.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody UpdateProfileRequest request) {
        UserDto updatedUser = userService.updateProfile(userDetails.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updatedUser));
    }

    @GetMapping("/staff")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllStaff() {
        List<UserDto> staffList = userService.getAllStaff();
        return ResponseEntity.ok(ApiResponse.success("Staff list retrieved successfully", staffList));
    }
}
