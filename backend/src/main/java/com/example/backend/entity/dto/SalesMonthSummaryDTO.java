package com.example.backend.entity.dto;

import java.math.BigDecimal;

public class SalesMonthSummaryDTO {

    private BigDecimal salesTotal;
    private BigDecimal profitTotal;

    public BigDecimal getSalesTotal() {
        return salesTotal;
    }

    public void setSalesTotal(BigDecimal salesTotal) {
        this.salesTotal = salesTotal;
    }

    public BigDecimal getProfitTotal() {
        return profitTotal;
    }

    public void setProfitTotal(BigDecimal profitTotal) {
        this.profitTotal = profitTotal;
    }
}
