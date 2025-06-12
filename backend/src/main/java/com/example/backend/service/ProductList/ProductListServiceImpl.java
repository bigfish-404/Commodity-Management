package com.example.backend.service.ProductList;

import com.example.backend.entity.ProductListEntity;
import com.example.backend.mapper.ProductListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 商品列表服务实现类
 */
@Service
public class ProductListServiceImpl implements ProductListService {

    @Autowired
    private ProductListMapper productListMapper;

    @Override
    public List<ProductListEntity> getAllProductsByUserId(Long userId, int offset, int limit) {
        return productListMapper.getAllProductsByUserId(userId, offset, limit);
    }

    @Override
    public int countProductsByUserId(Long userId) {
        return productListMapper.countProductsByUserId(userId);
    }

    @Override
    public void insertProduct(ProductListEntity product) {
        productListMapper.insertProduct(product);
    }
}
