package com.example.backend.entity;

import java.math.BigDecimal;
import java.util.Date;

public class ProductEntity {
    private Long id;
    private Long userId;
    private String productName;
    private Long categoryId;
    private Long specId;
    private Integer stockQty;
    private BigDecimal price;
    private BigDecimal purchasePrice;
    private Date lastSalesDate;
    private Integer totalSales;
    private String staff;
    private String createdBy;
    private Date createdAt;
    private String updatedBy;
    private Date updatedAt;
    private Integer deletedFlg;
    public Long getId() {
        return id;
    }
    public Long getUserId() {
        return userId;
    }
    public String getProductName() {
        return productName;
    }
    public Long getCategoryId() {
        return categoryId;
    }
    public Long getSpecId() {
        return specId;
    }
    public Integer getStockQty() {
        return stockQty;
    }
    public BigDecimal getPrice() {
        return price;
    }
    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }
    public Date getLastSalesDate() {
        return lastSalesDate;
    }
    public Integer getTotalSales() {
        return totalSales;
    }
    public String getStaff() {
        return staff;
    }
    public String getCreatedBy() {
        return createdBy;
    }
    public Date getCreatedAt() {
        return createdAt;
    }
    public String getUpdatedBy() {
        return updatedBy;
    }
    public Date getUpdatedAt() {
        return updatedAt;
    }
    public Integer getDeletedFlg() {
        return deletedFlg;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
    public void setSpecId(Long specId) {
        this.specId = specId;
    }
    public void setStockQty(Integer stockQty) {
        this.stockQty = stockQty;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }
    public void setLastSalesDate(Date lastSalesDate) {
        this.lastSalesDate = lastSalesDate;
    }
    public void setTotalSales(Integer totalSales) {
        this.totalSales = totalSales;
    }
    public void setStaff(String staff) {
        this.staff = staff;
    }
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
    public void setDeletedFlg(Integer deletedFlg) {
        this.deletedFlg = deletedFlg;
    }
    
    
}
