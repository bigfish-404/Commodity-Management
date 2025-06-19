package com.example.backend.service.SalesInputService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.SalesInputEntity;
import com.example.backend.mapper.SalesInputMapper;

@Service
public class SalesInputServiceImpl implements SalesInputService {

    @Autowired
    private SalesInputMapper salesInputMapper;

    @Override
    public List<SalesInputEntity> getAvailableSalesProducts(Long userId, Long channelId) {
        return salesInputMapper.selectAvailableSalesProductsByUserId(userId, channelId);
    }
}
