package com.example.backend.mapper;
import org.apache.ibatis.annotations.Mapper;

import com.example.backend.entity.db.ProductEntity;

@Mapper
public interface ProductAddMapper {
    void insertProduct (ProductEntity productEntity);
    
} 
