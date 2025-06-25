package com.example.backend.service.ProductAdd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.db.ProductEntity;
import com.example.backend.mapper.ProductAddMapper;

import jakarta.transaction.Transactional;

@Service
public class ProductAddServiceImpl implements ProductAddService {

    @Autowired
    private ProductAddMapper productAddMapper;

    @Transactional
    @Override
    public boolean addProduct(ProductEntity productEntity) {
        try {
            return productAddMapper.insertProduct(productEntity) > 0;
        } catch (Exception e) {
            throw new RuntimeException("商品登録に失敗しました: " + e.getMessage(), e);
        }
    }

}
