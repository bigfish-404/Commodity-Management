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
import com.example.backend.service.ProductInfroService.ProductInfoService;

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

}
