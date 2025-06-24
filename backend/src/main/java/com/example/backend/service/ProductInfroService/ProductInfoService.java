package com.example.backend.service.ProductInfroService;

import com.example.backend.entity.db.ProductInfoEntity;
import java.util.List;

public interface ProductInfoService {
    List<ProductInfoEntity> getAll(String userId);
    void add(ProductInfoEntity entity);
}
