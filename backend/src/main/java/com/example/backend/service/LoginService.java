package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.mapper.LoginMapper;

@Service
public class LoginService {

    @Autowired
    private LoginMapper loginMapper;    

    public boolean validateUser(String email, String password) {

        if (email == null  || email.trim().isEmpty() || 
            password == null || password.trim().isEmpty()) {
            // 检查用户名和密码是否为空
            return false;
        }

        if(!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")){
            // 检查用户名是否符合邮箱格式
            return false;   
        }

        int count = loginMapper.countMailAndPassword(email, password);
        return count > 0;
    }

}
