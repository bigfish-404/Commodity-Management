package com.example.backend.service.HomepageService;

import com.example.backend.entity.dto.ChannelRatioSummaryDTO;
import com.example.backend.entity.dto.SalesMonthSummaryDTO;
import com.example.backend.entity.dto.SalesSummaryDTO;

import java.util.Date;
import java.util.List;

public interface HomepageService {
    List<SalesSummaryDTO> getSalesSummaryFlexible(String userId, Date start, Date end, String format);
    List<ChannelRatioSummaryDTO> getChannelRatioSummary(String userId, Date start, Date end);
    SalesMonthSummaryDTO getMonthlyTotal(String userId, Date start, Date end);

}