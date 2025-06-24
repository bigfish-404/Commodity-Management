package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.backend.entity.db.UserEntity;


@Mapper
public interface RegisterMapper {
    void insertUser(UserEntity userEntity);
}
