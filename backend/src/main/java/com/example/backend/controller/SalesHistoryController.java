package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.db.ProfitEntity;
import com.example.backend.entity.dto.SalesHistoryEntity;
import com.example.backend.service.SalesHistoryService.SalesHistoryService;

@RequestMapping("/api/salesHistory")
@RestController
public class SalesHistoryController {

    @Autowired
    private SalesHistoryService salesHistoryService;

    @GetMapping("/list")
    public List<SalesHistoryEntity> getAllProfitById(@RequestParam("userId") String userId) {
        return salesHistoryService.getAllProfitByUserId(userId);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateProfit(@RequestBody SalesHistoryEntity salesHistoryEntity) {
        boolean updated = salesHistoryService.updateProfitIfChanged(salesHistoryEntity);
        if (updated) {
            return ResponseEntity.ok("更新成功");
        } else {
            return ResponseEntity.ok("无变更，无需更新");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteProfit(@RequestBody ProfitEntity profit) {
        try {
            salesHistoryService.deleteProfitAndRollbackProduct(profit);
            return ResponseEntity.ok("削除成功");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("削除失敗: " + e.getMessage());
        }
    }

}
