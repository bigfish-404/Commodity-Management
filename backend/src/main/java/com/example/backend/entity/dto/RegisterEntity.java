package com.example.backend.entity.dto;

public class RegisterEntity {
    private String username;
    private String password;
    private String email;
    private String confirmPassword;

    public RegisterEntity() {
    }

    public RegisterEntity(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.confirmPassword = password; // 默认情况下，确认密码与密码相同
        
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getConfirmPassword() {
        return confirmPassword;
    }
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
