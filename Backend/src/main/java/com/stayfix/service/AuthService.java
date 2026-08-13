package com.stayfix.service;

import com.stayfix.dto.JwtResponse;
import com.stayfix.dto.LoginRequest;
import com.stayfix.dto.RegisterRequest;
import com.stayfix.dto.UserDto;
import com.stayfix.entity.Role;
import com.stayfix.entity.User;
import com.stayfix.enum_.RoleType;
import com.stayfix.exception.BadRequestException;
import com.stayfix.exception.ResourceNotFoundException;
import com.stayfix.repository.RoleRepository;
import com.stayfix.repository.UserRepository;
import com.stayfix.security.JwtUtils;
import com.stayfix.security.UserDetailsImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder encoder,
                       JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    private void validateStayFixDomain(String email) {
        if (email == null || !email.trim().toLowerCase().endsWith("@stayfix.com")) {
            throw new BadRequestException("Email must end with @stayfix.com domain (e.g. name@stayfix.com)");
        }
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        validateStayFixDomain(loginRequest.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst().orElse("ROLE_STUDENT");

        return JwtResponse.builder()
                .token(jwt)
                .id(userDetails.getId())
                .fullName(userDetails.getFullName())
                .email(userDetails.getEmail())
                .role(role)
                .build();
    }

    public UserDto registerUser(RegisterRequest signUpRequest) {
        validateStayFixDomain(signUpRequest.getEmail());

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Error: Email is already in use!");
        }

        RoleType roleType = RoleType.ROLE_STUDENT;
        if (signUpRequest.getRole() != null && !signUpRequest.getRole().isBlank()) {
            try {
                roleType = RoleType.valueOf(signUpRequest.getRole().toUpperCase().startsWith("ROLE_") 
                        ? signUpRequest.getRole().toUpperCase() 
                        : "ROLE_" + signUpRequest.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid role specified");
            }
        }

        Role userRole = roleRepository.findByName(roleType)
                .orElseThrow(() -> new ResourceNotFoundException("Error: Role is not found."));

        User user = User.builder()
                .fullName(signUpRequest.getFullName())
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .phoneNumber(signUpRequest.getPhoneNumber())
                .roomNumber(signUpRequest.getRoomNumber())
                .hostelBlock(signUpRequest.getHostelBlock())
                .role(userRole)
                .active(true)
                .build();

        User savedUser = userRepository.save(user);
        return mapToUserDto(savedUser);
    }

    public UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .roomNumber(user.getRoomNumber())
                .hostelBlock(user.getHostelBlock())
                .role(user.getRole().getName().name())
                .active(user.getActive())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
