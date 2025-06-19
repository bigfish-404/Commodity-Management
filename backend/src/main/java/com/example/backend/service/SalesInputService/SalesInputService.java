package com.example.backend.service.SalesInputService;

import java.util.List;

import com.example.backend.entity.SalesInputEntity;

public interface SalesInputService {
    List<SalesInputEntity> getAvailableSalesProducts(Long userId, Long channelId);
}
