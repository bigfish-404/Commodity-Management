package com.example.backend.service.Register;

import com.example.backend.entity.db.UserEntity;
import com.example.backend.mapper.RegisterMapper;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private RegisterMapper registerMapper;

    @Override
    public boolean registerUser(String username, String email, String password, String confirmPassword) {

        UserEntity userEntity = new UserEntity();

        if (username == null || username.trim().isEmpty() ||
                email == null || email.trim().isEmpty() ||
                password == null || password.trim().isEmpty() ||
                confirmPassword == null || confirmPassword.trim().isEmpty() ||
                !password.equals(confirmPassword)) {

            return false;
        }

        if (!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            // 检查邮箱格式
            return false;
        }

        try {
            String uuid = UUID.randomUUID().toString().replace("-", "");

            userEntity.setUserId(uuid);
            userEntity.setUsername(username);
            userEntity.setEmail(email);
            userEntity.setPassword(password);
            userEntity.setCreatedBy(username);
            userEntity.setUpdatedBy(username);
            userEntity.setDeletedFlg(0);

            registerMapper.insertUser(userEntity);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
