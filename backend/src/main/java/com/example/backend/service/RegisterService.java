package com.example.backend.service;
import com.example.backend.mapper.RegisterMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    @Autowired
    private RegisterMapper registerMapper;

    public boolean registerUser(String username, String email, String password, String confirmPassword) {
        if (username == null || username.trim().isEmpty() ||
            email == null || email.trim().isEmpty() ||
            password == null || password.trim().isEmpty() ||
            confirmPassword == null || confirmPassword.trim().isEmpty() ||
            !password.equals(confirmPassword)
            ) {
                
            return false;
        }

        if (!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            // 检查邮箱格式
            return false;
        }

        try {
            registerMapper.insertUser(username, email, password);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
