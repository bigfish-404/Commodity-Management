package com.example.backend.service.ProductAdd;

import com.example.backend.entity.db.ProductEntity;

public interface ProductAddService {
    boolean addProduct(ProductEntity productEntity);
}
