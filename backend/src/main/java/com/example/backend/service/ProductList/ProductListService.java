package com.example.backend.service.ProductList;

import com.example.backend.entity.ProductListEntity;
import java.util.List;

/**
 * 商品列表服务接口
 */
public interface ProductListService {

    /**
     * 分页获取指定用户的商品列表
     * 
     * @param userId 用户ID
     * @param offset 分页偏移量
     * @param limit  每页数量
     * @return 商品列表
     */

    List<ProductListEntity> getAllProductsByUserId(Long userId, int offset, int limit, String orderBy,
            String orderDirection);

    /**
     * 获取指定用户的商品总数
     * 
     * @param userId 用户ID
     * @return 商品总数
     */
    int countProductsByUserId(Long userId);

    /**
     * 新增商品
     * 
     * @param product 商品实体
     */
    void insertProduct(ProductListEntity product);
}
