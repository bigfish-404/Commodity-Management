package com.example.backend.service.SalesInputService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.db.ProfitEntity;
import com.example.backend.entity.dto.SalesInputEntity;
import com.example.backend.mapper.SalesInputMapper;

import org.springframework.transaction.annotation.Transactional;

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
    @Transactional(rollbackFor = Exception.class)
    public void submitProduct(ProfitEntity profitEntity) {

        // 插入销售记录
        salesInputMapper.insertProfit(profitEntity);

        if (profitEntity.getUserId() != null && profitEntity.getQuantity() != null) {

            int updated = salesInputMapper.updateProductAfterSale(
                    profitEntity.getUserId(),
                    profitEntity.getQuantity(),
                    profitEntity.getSalesPerson(),
                    profitEntity.getProductId(),
                    profitEntity.getCategoryId(),
                    profitEntity.getSpecId()
            );

            if (updated == 0) {
                // 抛出运行时异常，Spring 将自动回滚 insert 操作
                throw new RuntimeException("❌ 商品更新失败，在 PRODUCTS 表中找不到匹配记录！");
            }
        } else {
            throw new IllegalArgumentException("❌ 参数不足：用户IDまたは販売数量が null です");
        }
    }
}
