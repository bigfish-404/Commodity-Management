package com.example.backend.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.LoginEntity;
import com.example.backend.service.LoginService;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginEntity loginEntity) {
        //@RequestBody将前端传过来的JSON数据转换为LoginEntity对象

        boolean valid = loginService.validateUser(loginEntity.getEmail(), loginEntity.getPassword());

        if (valid) {
             return ResponseEntity.ok(Collections.singletonMap("message", "Login successful"));
             //返回一个HTTP状态码为200的响应，表示登录成功，并返回一个包含消息的JSON对象
        } else {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("message", "Invalid username or password"));
        }
    }
}
