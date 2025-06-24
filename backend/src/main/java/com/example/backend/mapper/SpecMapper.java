package com.example.backend.mapper;

import java.util.List;

import com.example.backend.entity.db.SpecEntity;

public interface SpecMapper {
    
    void insertSpec(SpecEntity spec);

    List<SpecEntity> getAllSpecs(String userId);
}
