package com.example.backend.service.ProductList;

import com.example.backend.entity.dto.ProductListEntity;

import java.util.List;

public interface ProductListService {
    List<ProductListEntity> getAllProductsByUserId(String userId, String orderBy, String orderDirection, int offset,
            int limit);

    int countProductsByUserId(String userId);

    void updateProduct(ProductListEntity product);

    void deleteProduct(ProductListEntity product);
}
