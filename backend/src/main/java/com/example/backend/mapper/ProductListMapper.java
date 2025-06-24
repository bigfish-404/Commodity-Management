package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.dto.ProductListEntity;

/**
 * 商品列表Mapper接口（使用MyBatis映射SQL）
 */
@Mapper
public interface ProductListMapper {

    /**
     * 根据用户ID分页查询商品列表
     *
     * @param userId 用户ID（外键）
     * @param offset 分页起始行（偏移量）
     * @param limit  每页查询数量
     * @return 商品列表
     */
   List<ProductListEntity> getAllProductsByUserId(
    @Param("userId") Long userId, 
    @Param("offset") int offset, 
    @Param("limit") int limit,
    @Param("orderBy") String orderBy,
    @Param("orderDirection") String orderDirection
);


    /**
     * 根据用户ID查询商品总数（用于分页总条数计算）
     *
     * @param userId 用户ID
     * @return 商品总数量
     */
    int countProductsByUserId(@Param("userId") Long userId);

    /**
     * 插入新的商品记录
     *
     * @param productListEntity 商品实体对象
     */
    void insertProduct(ProductListEntity productListEntity);
}
