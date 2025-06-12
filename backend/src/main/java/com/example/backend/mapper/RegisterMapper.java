package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RegisterMapper {
    void insertUser(
            @Param("username") String username,
            @Param("email") String email,
            @Param("password") String password
            );
}
