package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.backend.entity.db.SpecEntity;

@Mapper
public interface SpecMapper {
    
    void insertSpec(SpecEntity spec);

    List<SpecEntity> getAllSpecs(String userId);
    
    void update(SpecEntity spec);

    void delete(Long id);
}
