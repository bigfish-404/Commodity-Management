package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.ProfitEntity;
import com.example.backend.entity.SalesInputEntity;
import com.example.backend.service.SalesInputService.SalesInputService;

@RequestMapping("/api")
@RestController
public class SalesInputController {

    @Autowired
    private SalesInputService salesInputService;

    // 查询指定用户、指定渠道下可销售的商品
    @GetMapping("/salesInput/{userId}/{channelId}")
    public List<SalesInputEntity> getAllSales(
            @PathVariable Long userId,
            @PathVariable Long channelId) {

        return salesInputService.getAvailableSalesProducts(userId, channelId);
    }

    @PostMapping("/sellProductSubmit")
    public void submitProduct(@RequestBody ProfitEntity profitEntity){
        salesInputService.submitProduct(profitEntity);
    }

}
