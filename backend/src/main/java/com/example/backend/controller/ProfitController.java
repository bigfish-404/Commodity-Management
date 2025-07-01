package com.example.backend.controller;

import com.example.backend.entity.dto.SalesSummaryDTO;
import com.example.backend.service.ProfitService.ProfitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/profit")
public class ProfitController {

    @Autowired
    private ProfitService profitService;

    @GetMapping("/stats")
    public List<SalesSummaryDTO> getStatsByRange(
            @RequestParam String userId,
            @RequestParam String range // e.g., "month", "week"
    ) {
        Date end = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(end);

        if ("month".equalsIgnoreCase(range)) {
            cal.add(Calendar.MONTH, -1);
        } else if ("week".equalsIgnoreCase(range)) {
            cal.add(Calendar.DATE, -7);
        } else {
            cal.add(Calendar.DATE, -30); // 默认 30天
        }

        Date start = cal.getTime();

        return profitService.getSalesSummary(userId, start, end);
    }

}