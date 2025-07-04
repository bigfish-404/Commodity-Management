package com.example.backend.service.ProfitService;

import com.example.backend.entity.dto.ChannelRatioSummaryDTO;
import com.example.backend.entity.dto.SalesSummaryDTO;

import java.util.Date;
import java.util.List;

public interface ProfitService {
    List<SalesSummaryDTO> getSalesSummaryFlexible(String userId, Date start, Date end, String format);
    List<ChannelRatioSummaryDTO> getChannelRatioSummary(String userId, Date start, Date end);

}