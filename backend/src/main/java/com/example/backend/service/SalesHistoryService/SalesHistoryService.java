package com.example.backend.service.SalesHistoryService;

import java.util.List;

import com.example.backend.entity.ProfitEntity;
import com.example.backend.entity.SalesHistoryEntity;

public interface SalesHistoryService {

    List<SalesHistoryEntity> getAllProfitByUserId(Long Id);

    boolean updateProfitIfChanged(ProfitEntity profit);
}
