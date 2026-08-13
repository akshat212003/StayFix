package com.stayfix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class StayFixApplication {

    public static void main(String[] args) {
        SpringApplication.run(StayFixApplication.class, args);
    }
}
