package com.example.backend.service.LoginService;

import com.example.backend.entity.db.UserEntity;

public interface LoginService {

    UserEntity validateUser(String email, String password);
}
