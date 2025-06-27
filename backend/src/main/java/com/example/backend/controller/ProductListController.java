package com.example.backend.controller;

import com.example.backend.entity.dto.ProductListEntity;
import com.example.backend.service.ProductList.ProductListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 商品管理控制器
 */
@RestController
@RequestMapping("/api")
public class ProductListController {

    @Autowired
    private ProductListService productListService;

    /**
     * 分页查询指定用户的商品列表
     */
    @GetMapping("/productList")
    public List<ProductListEntity> getAllProductsByUserId(
            @RequestParam String userId,
            @RequestParam int offset,
            @RequestParam int limit,
            @RequestParam(required = false, defaultValue = "productName") String orderBy,
            @RequestParam(required = false, defaultValue = "asc") String orderDirection) {

        return productListService.getAllProductsByUserId(userId, orderBy, orderDirection, offset, limit);
    }

    /**
     * 查询指定用户的商品总数量
     */
    @GetMapping("/productListCount")
    public int countProductsByUserId( @RequestParam String userId) {
        return productListService.countProductsByUserId(userId);
    }

    @PutMapping("/updateProduct")
    public ResponseEntity<?> updateProduct(@RequestBody ProductListEntity productListEntity){
        try{
            productListService.updateProduct(productListEntity);
            return ResponseEntity.ok("更新成功");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("更新失敗" + e.getMessage());
        }
    }

    @PutMapping("/deleteProduct")
    public ResponseEntity<?> deleteteProduct(@RequestBody ProductListEntity productListEntity){
        try{
            productListService.deleteProduct(productListEntity);
            return ResponseEntity.ok("删除成功");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("删除失敗" + e.getMessage());
        }
    }

}
