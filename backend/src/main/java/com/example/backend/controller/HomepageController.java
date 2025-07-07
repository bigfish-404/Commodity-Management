package com.example.backend.controller;

import com.example.backend.entity.dto.ChannelRatioSummaryDTO;
import com.example.backend.entity.dto.SalesSummaryDTO;
import com.example.backend.service.HomepageService.HomepageService;
import com.example.backend.entity.dto.SalesMonthSummaryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/homepage")
public class HomepageController {

    @Autowired
    private HomepageService homepageService;

    @GetMapping("/overview")
    public Map<String, Object> getMonthlyOverview(@RequestParam String userId) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_MONTH, 1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date start = cal.getTime();

        Calendar endCal = Calendar.getInstance();
        endCal.set(Calendar.HOUR_OF_DAY, 23);
        endCal.set(Calendar.MINUTE, 59);
        endCal.set(Calendar.SECOND, 59);
        endCal.set(Calendar.MILLISECOND, 999);
        Date end = endCal.getTime();

        SalesMonthSummaryDTO summary = homepageService.getMonthlyTotal(userId, start, end);

        Map<String, Object> result = new HashMap<>();
        result.put("salesTotal", summary.getSalesTotal());
        result.put("profitTotal", summary.getProfitTotal());
        return result;
    }

    @GetMapping("/stats")
    public List<SalesSummaryDTO> getStatsByRange(@RequestParam String userId, @RequestParam String range) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);

        Date end = cal.getTime();
        Date start;
        String groupFormat;

        switch (range.toLowerCase()) {
            case "week":
                // 最近 6 个完整周（日〜六）
                cal.add(Calendar.DATE, -7 * 6);
                start = cal.getTime();
                groupFormat = "week";
                break;
            case "month":
                // 最近 6 个月
                cal.add(Calendar.MONTH, -5); // 包含当月共 6 个
                cal.set(Calendar.DAY_OF_MONTH, 1);
                start = cal.getTime();
                groupFormat = "month";
                break;
            case "quarter":
                // 最近 6 个完整季度
                int currentMonth = cal.get(Calendar.MONTH);
                int currentQuarterStartMonth = (currentMonth / 3) * 3;
                cal.set(Calendar.MONTH, currentQuarterStartMonth);
                cal.set(Calendar.DAY_OF_MONTH, 1);
                end = cal.getTime();
                cal.add(Calendar.MONTH, -3 * 6);
                start = cal.getTime();
                groupFormat = "quarter";
                break;
            case "half":
                // 最近 4 个完整半年
                int month = cal.get(Calendar.MONTH);
                if (month < 6) {
                    cal.set(Calendar.MONTH, 0); // 1~6月
                } else {
                    cal.set(Calendar.MONTH, 6); // 7~12月
                }
                cal.set(Calendar.DAY_OF_MONTH, 1);
                end = cal.getTime();
                cal.add(Calendar.MONTH, -6 * 4);
                start = cal.getTime();
                groupFormat = "half";
                break;
            case "year":
                // 最近 4 年
                cal.set(Calendar.MONTH, 0);
                cal.set(Calendar.DAY_OF_MONTH, 1);
                end = cal.getTime();
                cal.add(Calendar.YEAR, -4);
                start = cal.getTime();
                groupFormat = "year";
                break;
            default:

                cal.add(Calendar.DATE, -7 * 6);
                start = cal.getTime();
                groupFormat = "week";
        }

        return homepageService.getSalesSummaryFlexible(userId, start, end, groupFormat);
    }

    @GetMapping("/channel-ratio")
    public List<ChannelRatioSummaryDTO> getChannelRatioSummary(
            @RequestParam String userId,
            @RequestParam String range) {

        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);

        Date start;
        Date end;

        switch (range.toLowerCase()) {
            case "day":
                // 今天 0:00 ~ 今天 23:59:59.999
                start = cal.getTime();
                cal.set(Calendar.HOUR_OF_DAY, 23);
                cal.set(Calendar.MINUTE, 59);
                cal.set(Calendar.SECOND, 59);
                cal.set(Calendar.MILLISECOND, 999);
                end = cal.getTime();
                break;

            case "week":
                // 本周一 0:00 ~ 本周日 23:59:59.999
                int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
                int diff = (dayOfWeek == Calendar.SUNDAY) ? -6 : Calendar.MONDAY - dayOfWeek;
                cal.add(Calendar.DATE, diff);
                start = cal.getTime();

                Calendar weekEnd = Calendar.getInstance();
                weekEnd.setTime(start);
                weekEnd.add(Calendar.DATE, 6);
                weekEnd.set(Calendar.HOUR_OF_DAY, 23);
                weekEnd.set(Calendar.MINUTE, 59);
                weekEnd.set(Calendar.SECOND, 59);
                weekEnd.set(Calendar.MILLISECOND, 999);
                end = weekEnd.getTime();
                break;

            case "month":
                // 本月 1号 0:00 ~ 本月最后一天 23:59:59.999
                cal.set(Calendar.DAY_OF_MONTH, 1);
                start = cal.getTime();

                Calendar monthEnd = (Calendar) cal.clone();
                monthEnd.set(Calendar.DAY_OF_MONTH, monthEnd.getActualMaximum(Calendar.DAY_OF_MONTH));
                monthEnd.set(Calendar.HOUR_OF_DAY, 23);
                monthEnd.set(Calendar.MINUTE, 59);
                monthEnd.set(Calendar.SECOND, 59);
                monthEnd.set(Calendar.MILLISECOND, 999);
                end = monthEnd.getTime();
                break;

            case "quarter":
                // 本季度开始 ~ 本季度末
                int currentMonth = cal.get(Calendar.MONTH);
                int quarterStartMonth = (currentMonth / 3) * 3;
                cal.set(Calendar.MONTH, quarterStartMonth);
                cal.set(Calendar.DAY_OF_MONTH, 1);
                start = cal.getTime();

                Calendar quarterEnd = (Calendar) cal.clone();
                quarterEnd.add(Calendar.MONTH, 2);
                quarterEnd.set(Calendar.DAY_OF_MONTH, quarterEnd.getActualMaximum(Calendar.DAY_OF_MONTH));
                quarterEnd.set(Calendar.HOUR_OF_DAY, 23);
                quarterEnd.set(Calendar.MINUTE, 59);
                quarterEnd.set(Calendar.SECOND, 59);
                quarterEnd.set(Calendar.MILLISECOND, 999);
                end = quarterEnd.getTime();
                break;

            case "half":
                // 上半年 or 下半年
                int m = cal.get(Calendar.MONTH);
                if (m < 6) {
                    cal.set(Calendar.MONTH, 0); // 1月
                } else {
                    cal.set(Calendar.MONTH, 6); // 7月
                }
                cal.set(Calendar.DAY_OF_MONTH, 1);
                start = cal.getTime();

                Calendar halfEnd = (Calendar) cal.clone();
                halfEnd.add(Calendar.MONTH, 5);
                halfEnd.set(Calendar.DAY_OF_MONTH, halfEnd.getActualMaximum(Calendar.DAY_OF_MONTH));
                halfEnd.set(Calendar.HOUR_OF_DAY, 23);
                halfEnd.set(Calendar.MINUTE, 59);
                halfEnd.set(Calendar.SECOND, 59);
                halfEnd.set(Calendar.MILLISECOND, 999);
                end = halfEnd.getTime();
                break;

            case "year":
                // 年初 ~ 年末
                cal.set(Calendar.MONTH, 0);
                cal.set(Calendar.DAY_OF_MONTH, 1);
                start = cal.getTime();

                Calendar yearEnd = (Calendar) cal.clone();
                yearEnd.set(Calendar.MONTH, 11);
                yearEnd.set(Calendar.DAY_OF_MONTH, 31);
                yearEnd.set(Calendar.HOUR_OF_DAY, 23);
                yearEnd.set(Calendar.MINUTE, 59);
                yearEnd.set(Calendar.SECOND, 59);
                yearEnd.set(Calendar.MILLISECOND, 999);
                end = yearEnd.getTime();
                break;

            default:
                // 默认过去 1 个月
                Calendar defaultStart = (Calendar) cal.clone();
                defaultStart.add(Calendar.MONTH, -1);
                start = defaultStart.getTime();

                Calendar defaultEnd = Calendar.getInstance();
                defaultEnd.set(Calendar.HOUR_OF_DAY, 23);
                defaultEnd.set(Calendar.MINUTE, 59);
                defaultEnd.set(Calendar.SECOND, 59);
                defaultEnd.set(Calendar.MILLISECOND, 999);
                end = defaultEnd.getTime();
        }

        return homepageService.getChannelRatioSummary(userId, start, end);
    }

}
