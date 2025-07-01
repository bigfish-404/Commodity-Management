package com.example.backend.service.ProfitService;

import com.example.backend.entity.dto.SalesSummaryDTO;
import java.util.Date;
import java.util.List;

public interface ProfitService {
    List<SalesSummaryDTO> getSalesSummary(String userId, Date start, Date end);
}
