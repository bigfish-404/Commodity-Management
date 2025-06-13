package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.UserEntity;
import com.example.backend.mapper.LoginMapper;

@Service
public class LoginService {

    @Autowired
    private LoginMapper loginMapper;    

    public UserEntity validateUser(String email, String password) {

        // 基础校验
        if (email == null  || email.trim().isEmpty() || 
            password == null || password.trim().isEmpty()) {
            return null;
        }

        if(!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")){
            return null;   
        }

        UserEntity usereEntity = loginMapper.findByEmail(email);
        if (usereEntity == null) {
            return null;
        }

        if (!usereEntity.getPassword().equals(password)) {
            return null;
        }

        return usereEntity;
    }
}
