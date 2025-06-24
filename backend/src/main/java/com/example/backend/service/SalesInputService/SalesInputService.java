package com.example.backend.service.SalesInputService;

import java.util.List;

import com.example.backend.entity.db.ProfitEntity;
import com.example.backend.entity.dto.SalesInputEntity;

public interface SalesInputService {
    List<SalesInputEntity> getAvailableSalesProducts(Long userId, Long channelId);
    void submitProduct(ProfitEntity productEntity);
}
