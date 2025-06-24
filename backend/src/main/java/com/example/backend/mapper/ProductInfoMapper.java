package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import com.example.backend.entity.db.ProductInfoEntity;

@Mapper
public interface ProductInfoMapper {

    List<ProductInfoEntity> getAllProductInfo(String userId);

    int insertProductInfo(ProductInfoEntity entity);

}