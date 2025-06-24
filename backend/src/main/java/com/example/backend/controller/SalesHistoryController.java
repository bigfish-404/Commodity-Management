package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.db.ProfitEntity;
import com.example.backend.entity.dto.SalesHistoryEntity;
import com.example.backend.service.SalesHistoryService.SalesHistoryService;

@RequestMapping("/api")
@RestController
public class SalesHistoryController {

    @Autowired
    private SalesHistoryService salesHistoryService;

    @GetMapping("/sales-history/{userId}")
    public List<SalesHistoryEntity> getAllProfitById(@PathVariable Long userId){
        return salesHistoryService.getAllProfitByUserId(userId);
    }

    @PostMapping("/updateProfit")
public ResponseEntity<String> updateProfit(@RequestBody ProfitEntity profit) {
    boolean updated = salesHistoryService.updateProfitIfChanged(profit);
    if (updated) {
        return ResponseEntity.ok("更新成功");
    } else {
        return ResponseEntity.ok("无变更，无需更新");
    }
}
}
