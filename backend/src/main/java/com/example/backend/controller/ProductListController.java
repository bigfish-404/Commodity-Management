package com.example.backend.controller;

import com.example.backend.entity.ProductListEntity;
import com.example.backend.service.ProductList.ProductListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 商品管理控制器
 */
@RestController
@RequestMapping("/api/products")
public class ProductListController {

    @Autowired
    private ProductListService productListService;

    /**
     * 分页查询指定用户的商品列表
     */
    @GetMapping("/{userId}")
    public List<ProductListEntity> getAllProductsByUserId(
            @PathVariable("userId") Long userId,
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return productListService.getAllProductsByUserId(userId, offset, limit);
    }

    /**
     * 查询指定用户的商品总数量
     */
    @GetMapping("/{userId}/count")
    public int countProductsByUserId(@PathVariable("userId") Long userId) {
        return productListService.countProductsByUserId(userId);
    }

    /**
     * 新增商品
     */
    @PostMapping
    public void insertProduct(@RequestBody ProductListEntity product) {
        productListService.insertProduct(product);
    }
}
