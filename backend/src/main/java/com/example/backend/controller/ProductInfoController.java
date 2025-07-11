package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.backend.entity.db.ProductInfoEntity;
import com.example.backend.service.ProductInfoService.ProductInfoService;

@RestController
@RequestMapping("/api")
public class ProductInfoController {

    @Autowired
    private ProductInfoService service;

    @GetMapping("/getAllProductInfo")
    public List<ProductInfoEntity> getAll(@RequestParam("userId") String userId) {
        return service.getAll(userId);
    }

    @PostMapping("/addProductInfo")
    public void add(@RequestBody ProductInfoEntity entity) {
        service.add(entity);
    }

    @PostMapping("/updateProductInfo")
    public int updateProductInfo(@RequestBody ProductInfoEntity product) {
        return service.updateProductInfo(product);
    }   

    @PostMapping("/deleteProductInfo")
    public int deleteProductInfo(@RequestParam("id") Long id) {
        return service.deleteProductInfo(id);
    }

}
