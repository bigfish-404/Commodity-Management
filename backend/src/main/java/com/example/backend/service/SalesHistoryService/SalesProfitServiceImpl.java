package com.example.backend.service.SalesHistoryService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.db.ProductEntity;
import com.example.backend.entity.db.ProfitEntity;
import com.example.backend.entity.dto.SalesHistoryEntity;
import com.example.backend.mapper.SalesHistoryMapper;

@Service
public class SalesProfitServiceImpl implements SalesHistoryService {

    @Autowired
    private SalesHistoryMapper salesHistoryMapper;

    @Override
    public List<SalesHistoryEntity> getAllProfitByUserId(String userId) {
        return salesHistoryMapper.selectAllProfits(userId);
    }

    @Override
    public boolean updateProfitIfChanged(SalesHistoryEntity salesHistoryEntity) {
        int updated = salesHistoryMapper.updateProfitIfChanged(salesHistoryEntity);
        return updated > 0;
    }

    @Override
    public void deleteProfitAndRollbackProduct(ProfitEntity profit) {
        // 逻辑删除 PROFIT 表记录
        salesHistoryMapper.markAsDeleted(profit.getId());

        // 构造产品信息进行库存回滚
        ProductEntity product = new ProductEntity();
        product.setUserId(profit.getUserId());
        product.setProductId(profit.getProductId());
        product.setCategoryId(profit.getCategoryId());
        product.setSpecId(profit.getSpecId());
        product.setStaff(profit.getSalesPerson()); // 或 setStaff(profit.getUpdatedBy());
        product.setUpdatedBy(profit.getUpdatedBy());

        salesHistoryMapper.updateProductOnDelete(product);
    }
}
