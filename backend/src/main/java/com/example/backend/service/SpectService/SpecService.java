package com.example.backend.service.SpectService;

import java.util.List;

import com.example.backend.entity.db.SpecEntity;

public interface SpecService {
    void insertSpec(SpecEntity spec);
    List<SpecEntity> getAllSpecs(String userId);
    void update(SpecEntity spec);
    void delete(Long id);
}
