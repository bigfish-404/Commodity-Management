package com.example.backend.service.SalesHistoryService;

import java.util.List;

import com.example.backend.entity.db.ProfitEntity;
import com.example.backend.entity.dto.SalesHistoryEntity;

public interface SalesHistoryService {

    List<SalesHistoryEntity> getAllProfitByUserId(Long Id);

    boolean updateProfitIfChanged(ProfitEntity profit);
}
