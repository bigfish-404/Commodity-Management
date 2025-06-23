package com.example.backend.service.SalesHistoryService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.entity.ProfitEntity;
import com.example.backend.entity.SalesHistoryEntity;
import com.example.backend.mapper.SalesHistoryMapper;

@Service
public class SalesProfitServiceImpl implements SalesHistoryService {

    @Autowired
    private SalesHistoryMapper salesHistoryMapper;

    @Override
    public List<SalesHistoryEntity> getAllProfitByUserId(Long userId) {
        return salesHistoryMapper.selectAllProfits(userId);
    }

    @Override
    public boolean updateProfitIfChanged(ProfitEntity profit) {
        int updated = salesHistoryMapper.updateProfitIfChanged(profit);
        return updated > 0;
    }
    

}
