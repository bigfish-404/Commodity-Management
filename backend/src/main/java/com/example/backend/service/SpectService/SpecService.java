package com.example.backend.service.SpectService;

import com.example.backend.entity.SpecEntity;
import java.util.List;

public interface SpecService {
    void insertSpec(SpecEntity spec);
    List<SpecEntity> getAllSpecs();
}
