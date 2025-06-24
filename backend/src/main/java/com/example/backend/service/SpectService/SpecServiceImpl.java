package com.example.backend.service.SpectService;

import com.example.backend.entity.db.SpecEntity;
import com.example.backend.mapper.SpecMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecServiceImpl implements SpecService {

    @Autowired
    private SpecMapper specMapper;

    @Override
    public void insertSpec(SpecEntity spec) {
        specMapper.insertSpec(spec);
    }

    @Override
    public List<SpecEntity> getAllSpecs(String userId) {
        return specMapper.getAllSpecs(userId);
    }
}
