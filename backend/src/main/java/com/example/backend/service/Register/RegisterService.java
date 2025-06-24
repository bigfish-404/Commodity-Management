package com.example.backend.service.Register;

public interface RegisterService {
    boolean registerUser(String username, String email, String password, String confirmPassword);

}
