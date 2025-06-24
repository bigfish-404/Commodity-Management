package com.example.backend.service.ProductInfroService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.backend.entity.db.ProductInfoEntity;
import com.example.backend.mapper.ProductInfoMapper;

@Service
public class ProductInfoServiceImpl implements ProductInfoService{
    @Autowired
    private ProductInfoMapper mapper;

    @Override
    public List<ProductInfoEntity> getAll(String userId) {
        return mapper.getAllProductInfo(userId);
    }

    @Override
    public void add(ProductInfoEntity entity) {
        mapper.insertProductInfo(entity);
    }
}
