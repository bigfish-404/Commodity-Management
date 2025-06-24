package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.db.ProductEntity;
import com.example.backend.service.ProductAdd.ProductAddService;


@RequestMapping("/api/productAdd")
@RestController
@CrossOrigin
public class ProductAddController {
    
    @Autowired
    private ProductAddService productAddService;

    @PostMapping
    public void addProduct(@RequestBody ProductEntity  productEntity){
        productAddService.addProduct(productEntity);
    }
}
