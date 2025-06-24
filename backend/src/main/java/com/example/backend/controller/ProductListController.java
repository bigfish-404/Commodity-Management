package com.example.backend.controller;

import com.example.backend.entity.dto.ProductListEntity;
import com.example.backend.service.ProductList.ProductListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 商品管理控制器
 */
@RestController
@RequestMapping("/api/productList")
public class ProductListController {

    @Autowired
    private ProductListService productListService;

    /**
     * 分页查询指定用户的商品列表
     */
    @GetMapping("/{userId}")
    public List<ProductListEntity> getAllProductsByUserId(
            @PathVariable Long userId,
            @RequestParam int offset,
            @RequestParam int limit,
            @RequestParam(required = false, defaultValue = "productName") String orderBy,
            @RequestParam(required = false, defaultValue = "asc") String orderDirection) {
        return productListService.getAllProductsByUserId(userId, offset, limit, orderBy, orderDirection);
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
