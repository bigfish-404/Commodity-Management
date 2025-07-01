package com.example.backend.service.ProfitService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.dto.SalesSummaryDTO;
import com.example.backend.mapper.ProfitMapper;

import java.util.Date;
import java.util.List;

@Service
public class ProfitServiceImpt implements ProfitService {

    @Autowired
    private ProfitMapper profitMapper;

    @Override
    public List<SalesSummaryDTO> getSalesSummary(String userId, Date start, Date end) {
        return profitMapper.getSalesSummaryByDateRange(userId, start, end);
    }

}
