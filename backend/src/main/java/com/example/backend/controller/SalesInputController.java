package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.db.ProfitEntity;
import com.example.backend.entity.dto.SalesInputEntity;
import com.example.backend.service.SalesInputService.SalesInputService;

@RequestMapping("/api/salesInput")
@RestController
public class SalesInputController {

    @Autowired
    private SalesInputService salesInputService;

    // 查询指定用户、指定渠道下可销售的商品
    @GetMapping("/getAll")
    public List<SalesInputEntity> getAllSales(
            @RequestParam String userId,
            @RequestParam Long channelId) {

        return salesInputService.getAvailableSalesProducts(userId, channelId);
    }

    @PostMapping("/submit")

    public ResponseEntity<String> submitProduct(@RequestBody ProfitEntity profitEntity) {
        try {
            salesInputService.submitProduct(profitEntity);
            return ResponseEntity.ok("販売記録の登録に成功しました。");
        } catch (Exception e) {
            e.printStackTrace(); // for debug
            return ResponseEntity.badRequest().body("販売処理に失敗しました: " + e.getMessage());
        }
    }
}
