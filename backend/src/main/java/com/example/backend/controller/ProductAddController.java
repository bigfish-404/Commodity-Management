package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.backend.entity.db.ProductEntity;
import com.example.backend.service.ProductAdd.ProductAddService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductAddController {

    private static final Logger log = LoggerFactory.getLogger(ProductAddController.class); // ✅ 放在类中

    @Autowired
    private ProductAddService productAddService;

    @PostMapping("/productAdd")
    public ResponseEntity<?> addProduct(@RequestBody ProductEntity productEntity) {
        try {
            boolean success = productAddService.addProduct(productEntity);
            if (success) {
                return ResponseEntity.ok("商品登録成功");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("商品登録失敗");
            }
        } catch (Exception e) {
            log.error("商品登録エラー", e); // ✅ 这里直接使用
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("システムエラー：" + e.getMessage());
        }
    }
}
