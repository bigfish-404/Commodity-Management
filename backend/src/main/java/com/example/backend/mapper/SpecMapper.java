package com.example.backend.mapper;

import com.example.backend.entity.SpecEntity;
import java.util.List;

public interface SpecMapper {
    void insertSpec(SpecEntity spec);
    List<SpecEntity> getAllSpecs();
}
