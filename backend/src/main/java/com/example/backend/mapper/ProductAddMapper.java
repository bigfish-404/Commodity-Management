package com.example.backend.mapper;
import com.example.backend.entity.ProductEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductAddMapper {
    void insertProduct (ProductEntity productEntity);
    
} 
