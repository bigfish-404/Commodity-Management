package com.example.backend.controller;

import com.example.backend.entity.dto.SalesSummaryDTO;
import com.example.backend.service.ProfitService.ProfitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/profit")
public class ProfitController {

    @Autowired
    private ProfitService profitService;

    @GetMapping("/stats")
    public List<SalesSummaryDTO> getStatsByRange(@RequestParam String userId, @RequestParam String range) {
        Date end = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(end);

        String groupFormat;
        switch (range.toLowerCase()) {
            case "month":
                cal.add(Calendar.MONTH, -1);
                groupFormat = "day";
                break;
            case "quarter":
                cal.add(Calendar.MONTH, -3);
                groupFormat = "month";
                break;
            case "half":
                cal.add(Calendar.MONTH, -6);
                groupFormat = "month";
                break;
            case "year":
                cal.add(Calendar.YEAR, -1);
                groupFormat = "month";
                break;
            default:
                cal.add(Calendar.MONTH, -1);
                groupFormat = "day";
        }

        Date start = cal.getTime();
        return profitService.getSalesSummaryFlexible(userId, start, end, groupFormat);
    }
}
