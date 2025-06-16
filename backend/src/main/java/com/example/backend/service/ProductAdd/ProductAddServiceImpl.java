package com.example.backend.service.ProductAdd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.ProductEntity;
import com.example.backend.mapper.ProductAddMapper;

@Service
public class ProductAddServiceImpl implements ProductAddService{
    
    @Autowired
    private ProductAddMapper productAddMapper;

    @Override
    public void addProduct(ProductEntity productEntity){
        productAddMapper.insertProduct(productEntity);
    }

}
