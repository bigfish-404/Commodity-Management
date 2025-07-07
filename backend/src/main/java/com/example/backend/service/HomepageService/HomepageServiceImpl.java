package com.example.backend.service.HomepageService;

import com.example.backend.entity.dto.ChannelRatioSummaryDTO;
import com.example.backend.entity.dto.SalesSummaryDTO;
import com.example.backend.mapper.HomepageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.entity.dto.SalesMonthSummaryDTO;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class HomepageServiceImpl implements HomepageService {

    @Autowired
    private HomepageMapper homepageMapper;

    @Override
    public SalesMonthSummaryDTO getMonthlyTotal(String userId, Date start, Date end) {
        return homepageMapper.getMonthlyTotal(userId, start, end);
    }

    @Override
    public List<SalesSummaryDTO> getSalesSummaryFlexible(String userId, Date start, Date end, String format) {
        List<SalesSummaryDTO> list = homepageMapper.getSalesSummaryFlexible(userId, start, end, format);

        // 按 label 分组，计算每个 label 的总销售额，按 label 排序
        Map<String, List<SalesSummaryDTO>> grouped = new LinkedHashMap<>();
        for (SalesSummaryDTO dto : list) {
            grouped.computeIfAbsent(dto.getLabel(), k -> new ArrayList<>()).add(dto);
        }

        List<SalesSummaryDTO> summarizedList = new ArrayList<>();
        SalesSummaryDTO prev = null;

        for (Map.Entry<String, List<SalesSummaryDTO>> entry : grouped.entrySet()) {
            String label = entry.getKey();
            List<SalesSummaryDTO> groupList = entry.getValue();

            double salesSum = groupList.stream().mapToDouble(SalesSummaryDTO::getSales).sum();
            double profitSum = groupList.stream().mapToDouble(SalesSummaryDTO::getProfit).sum();

            SalesSummaryDTO summary = new SalesSummaryDTO();
            summary.setLabel(label);
            summary.setSales(salesSum);
            summary.setProfit(profitSum);

            if (prev != null && prev.getSales() > 0) {
                double growth = (salesSum - prev.getSales()) / prev.getSales() * 100;
                summary.setGrowth(Math.round(growth * 10.0) / 10.0);
            } else {
                summary.setGrowth(0.0);
            }

            summarizedList.add(summary);
            prev = summary;
        }

        return summarizedList;
    }

    @Override
    public List<ChannelRatioSummaryDTO> getChannelRatioSummary(String userId, Date start, Date end) {
        return homepageMapper.getChannelRatioSummary(userId, start, end);
    }

}
