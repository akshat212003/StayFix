package com.stayfix.controller;

import com.stayfix.dto.ApiResponse;
import com.stayfix.dto.JwtResponse;
import com.stayfix.dto.LoginRequest;
import com.stayfix.dto.RegisterRequest;
import com.stayfix.dto.UserDto;
import com.stayfix.security.UserDetailsImpl;
import com.stayfix.service.AuthService;
import com.stayfix.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponse>> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(ApiResponse.success("User logged in successfully", jwtResponse));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDto>> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        UserDto registeredUser = authService.registerUser(signUpRequest);
        return new ResponseEntity<>(ApiResponse.success("Student registered successfully", registeredUser), HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        UserDto userProfile = userService.getUserProfile(userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Current user profile retrieved", userProfile));
    }
}
