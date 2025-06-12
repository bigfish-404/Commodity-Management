package com.example.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;
import java.util.Collections;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.backend.entity.RegisterEntity;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.backend.service.RegisterService;

@RestController
@RequestMapping("/api")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterEntity registerEntity) {
        boolean success = registerService.registerUser(
            registerEntity.getUsername(),
            registerEntity.getEmail(),
            registerEntity.getPassword(),
            registerEntity.getConfirmPassword()
        );

        if (success) {
            return ResponseEntity.ok(Collections.singletonMap("message", "Registration successful"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Collections.singletonMap("message", "Registration failed"));
        }
    }
}
