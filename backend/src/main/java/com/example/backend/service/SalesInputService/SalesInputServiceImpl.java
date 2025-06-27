package com.example.backend.service.SalesInputService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.db.ProfitEntity;
import com.example.backend.entity.dto.SalesInputEntity;
import com.example.backend.mapper.SalesInputMapper;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SalesInputServiceImpl implements SalesInputService {

    @Autowired
    private SalesInputMapper salesInputMapper;

    @Override
    public List<SalesInputEntity> getAvailableSalesProducts(String userId, Long channelId) {
        return salesInputMapper.selectAvailableSalesProductsByUserId(userId, channelId);
    }

    @Override
    public void submitProduct(ProfitEntity profitEntity){
        salesInputMapper.insertProfit(profitEntity);

        if (profitEntity.getUserId() != null && profitEntity.getQuantity() != null) {

            salesInputMapper.updateProductAfterSale(
                profitEntity.getUserId(),
                profitEntity.getQuantity(),
                profitEntity.getSalesPerson(),
                profitEntity.getProductName(),
                profitEntity.getCategory(),
                profitEntity.getSpec()
            );
    }
    }
}
