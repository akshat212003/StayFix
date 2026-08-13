package com.stayfix.service;

import com.stayfix.dto.UpdateProfileRequest;
import com.stayfix.dto.UserDto;
import com.stayfix.entity.User;
import com.stayfix.enum_.RoleType;
import com.stayfix.exception.ResourceNotFoundException;
import com.stayfix.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    public UserService(UserRepository userRepository, AuthService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    public UserDto getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return authService.mapToUserDto(user);
    }

    public UserDto updateProfile(Long userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            user.setFullName(request.getFullName());
        }
        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getRoomNumber() != null) {
            user.setRoomNumber(request.getRoomNumber());
        }
        if (request.getHostelBlock() != null) {
            user.setHostelBlock(request.getHostelBlock());
        }

        User updatedUser = userRepository.save(user);
        return authService.mapToUserDto(updatedUser);
    }

    public List<UserDto> getAllStaff() {
        return userRepository.findByRole_Name(RoleType.ROLE_STAFF).stream()
                .map(authService::mapToUserDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> getAllStudents() {
        return userRepository.findByRole_Name(RoleType.ROLE_STUDENT).stream()
                .map(authService::mapToUserDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(authService::mapToUserDto)
                .collect(Collectors.toList());
    }

    public UserDto toggleUserActiveStatus(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        user.setActive(!user.getActive());
        User saved = userRepository.save(user);
        return authService.mapToUserDto(saved);
    }
}
