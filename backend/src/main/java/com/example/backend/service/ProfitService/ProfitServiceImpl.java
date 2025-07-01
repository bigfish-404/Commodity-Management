package com.example.backend.service.ProfitService;

import com.example.backend.entity.dto.SalesSummaryDTO;
import com.example.backend.mapper.ProfitMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProfitServiceImpl implements ProfitService {

    @Autowired
    private ProfitMapper profitMapper;

    @Override
    public List<SalesSummaryDTO> getSalesSummaryFlexible(String userId, Date start, Date end, String format) {
        List<SalesSummaryDTO> list = profitMapper.getSalesSummaryFlexible(userId, start, end, format);

        // ✅ 补充计算 growth 成長率（%）
        for (int i = 1; i < list.size(); i++) {
            SalesSummaryDTO prev = list.get(i - 1);
            SalesSummaryDTO curr = list.get(i);

            if (prev.getSales() != null && prev.getSales() > 0) {
                double rate = ((curr.getSales() - prev.getSales()) / prev.getSales()) * 100;
                curr.setGrowth(Math.round(rate * 10.0) / 10.0); // 保留一位小数
            } else {
                curr.setGrowth(null); // 或设为 0.0
            }
        }

        // 第一项 growth 设为 null
        if (!list.isEmpty()) {
            list.get(0).setGrowth(null);
        }

        return list;
    }
}
