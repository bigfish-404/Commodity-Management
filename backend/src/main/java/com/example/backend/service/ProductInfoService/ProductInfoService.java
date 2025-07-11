package com.example.backend.service.ProductInfoService;

import com.example.backend.entity.db.ProductInfoEntity;
import java.util.List;

public interface ProductInfoService {
    List<ProductInfoEntity> getAll(String userId);
    void add(ProductInfoEntity entity);
    int updateProductInfo(ProductInfoEntity product);
    int deleteProductInfo(Long id);
}
