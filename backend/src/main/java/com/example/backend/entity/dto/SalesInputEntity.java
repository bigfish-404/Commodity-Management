package com.example.backend.entity.dto;

import java.math.BigDecimal;
import java.util.Date;

public class SalesInputEntity {
    private Long id;

private String userId;
private String productId;
private String productName;

private String categoryId;
private String categoryName;

private String specId;
private String specName;

private Integer stockQty;
private Integer stockAlert;

private BigDecimal price;
private BigDecimal purchasePrice;
private Integer totalSales;

private Date lastSalesDate;
private String staff;

private String deliveryMethodId;
private String deliveryCompany;
private String deliveryMethod;

private BigDecimal deliveryPrice;

private String createdBy;
private Date createdAt;
private String updatedBy;
private Date updatedAt;

private String deletedFlg;

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getUserId() {
    return userId;
}

public void setUserId(String userId) {
    this.userId = userId;
}

public String getProductId() {
    return productId;
}

public void setProductId(String productId) {
    this.productId = productId;
}

public String getProductName() {
    return productName;
}

public void setProductName(String productName) {
    this.productName = productName;
}

public String getCategoryId() {
    return categoryId;
}

public void setCategoryId(String categoryId) {
    this.categoryId = categoryId;
}

public String getCategoryName() {
    return categoryName;
}

public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
}

public String getSpecId() {
    return specId;
}

public void setSpecId(String specId) {
    this.specId = specId;
}

public String getSpecName() {
    return specName;
}

public void setSpecName(String specName) {
    this.specName = specName;
}

public Integer getStockQty() {
    return stockQty;
}

public void setStockQty(Integer stockQty) {
    this.stockQty = stockQty;
}

public Integer getStockAlert() {
    return stockAlert;
}

public void setStockAlert(Integer stockAlert) {
    this.stockAlert = stockAlert;
}

public BigDecimal getPrice() {
    return price;
}

public void setPrice(BigDecimal price) {
    this.price = price;
}

public BigDecimal getPurchasePrice() {
    return purchasePrice;
}

public void setPurchasePrice(BigDecimal purchasePrice) {
    this.purchasePrice = purchasePrice;
}

public Integer getTotalSales() {
    return totalSales;
}

public void setTotalSales(Integer totalSales) {
    this.totalSales = totalSales;
}

public Date getLastSalesDate() {
    return lastSalesDate;
}

public void setLastSalesDate(Date lastSalesDate) {
    this.lastSalesDate = lastSalesDate;
}

public String getStaff() {
    return staff;
}

public void setStaff(String staff) {
    this.staff = staff;
}

public String getDeliveryMethodId() {
    return deliveryMethodId;
}

public void setDeliveryMethodId(String deliveryMethodId) {
    this.deliveryMethodId = deliveryMethodId;
}

public String getDeliveryCompany() {
    return deliveryCompany;
}

public void setDeliveryCompany(String deliveryCompany) {
    this.deliveryCompany = deliveryCompany;
}

public String getDeliveryMethod() {
    return deliveryMethod;
}

public void setDeliveryMethod(String deliveryMethod) {
    this.deliveryMethod = deliveryMethod;
}

public BigDecimal getDeliveryPrice() {
    return deliveryPrice;
}

public void setDeliveryPrice(BigDecimal deliveryPrice) {
    this.deliveryPrice = deliveryPrice;
}

public String getCreatedBy() {
    return createdBy;
}

public void setCreatedBy(String createdBy) {
    this.createdBy = createdBy;
}

public Date getCreatedAt() {
    return createdAt;
}

public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
}

public String getUpdatedBy() {
    return updatedBy;
}

public void setUpdatedBy(String updatedBy) {
    this.updatedBy = updatedBy;
}

public Date getUpdatedAt() {
    return updatedAt;
}

public void setUpdatedAt(Date updatedAt) {
    this.updatedAt = updatedAt;
}

public String getDeletedFlg() {
    return deletedFlg;
}

public void setDeletedFlg(String deletedFlg) {
    this.deletedFlg = deletedFlg;
}

   
}
