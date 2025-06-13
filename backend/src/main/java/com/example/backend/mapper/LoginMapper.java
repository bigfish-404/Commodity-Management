package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.UserEntity;

@Mapper
public interface LoginMapper {

    // 只需要查 email，查出完整用户信息
    UserEntity findByEmail(@Param("email") String email);
}
