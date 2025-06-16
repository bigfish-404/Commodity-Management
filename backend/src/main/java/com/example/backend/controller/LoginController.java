package com.example.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.entity.UserEntity;
import com.example.backend.service.LoginService;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity loginRequest) {

        UserEntity usereEntity = loginService.validateUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (usereEntity != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", usereEntity.getId());
            response.put("name", usereEntity.getUsername());
            response.put("email",  usereEntity.getEmail());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid username or password"));
        }
    }
}
