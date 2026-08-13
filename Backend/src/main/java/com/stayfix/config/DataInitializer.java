package com.stayfix.config;

import com.stayfix.entity.Role;
import com.stayfix.entity.User;
import com.stayfix.enum_.RoleType;
import com.stayfix.repository.RoleRepository;
import com.stayfix.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize Base System Roles
        Role adminRole = roleRepository.findByName(RoleType.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(Role.builder().name(RoleType.ROLE_ADMIN).build()));

        Role staffRole = roleRepository.findByName(RoleType.ROLE_STAFF)
                .orElseGet(() -> roleRepository.save(Role.builder().name(RoleType.ROLE_STAFF).build()));

        Role studentRole = roleRepository.findByName(RoleType.ROLE_STUDENT)
                .orElseGet(() -> roleRepository.save(Role.builder().name(RoleType.ROLE_STUDENT).build()));

        // Ensure default system admin exists with password admin123
        userRepository.findByEmail("admin@stayfix.com").ifPresentOrElse(
            admin -> {
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setActive(true);
                userRepository.save(admin);
            },
            () -> {
                userRepository.save(User.builder()
                        .fullName("Chief Warden Admin")
                        .email("admin@stayfix.com")
                        .password(passwordEncoder.encode("admin123"))
                        .phoneNumber("9876543210")
                        .roomNumber("A-001")
                        .hostelBlock("Admin Block")
                        .role(adminRole)
                        .active(true)
                        .build());
                logger.info("StayFix initialized default initial admin account (admin@stayfix.com / admin123).");
            }
        );

        logger.info("StayFix DataInitializer initialized system roles cleanly.");
    }
}
