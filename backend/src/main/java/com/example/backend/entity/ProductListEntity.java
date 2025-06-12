package com.example.backend.entity;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 商品表实体类，对应数据库表 COMMODITY_MANAGEMENT.PRODUCTS
 */
public class ProductListEntity {

    /** 商品ID (主键) */
    private Long id;

    /** 所属用户ID (外键，关联 USERS 表 ID) */
    private Long userId;

    /** 商品名称 */
    private String productName;

    /** 商品分类 */
    private String category;

    /** 规格/型号 */
    private String spec;

    /** 库存数量 */
    private Integer stockQty;

    /** 销售单价（含税） */
    private BigDecimal price;

    /** 进货价 */
    private BigDecimal purchasePrice;

    /** 最后销售日期 */
    private Date lastSalesDate;

    /** 累计销售数量 */
    private Integer totalSales;

    /** 负责人 */
    private String staff;

    /** 创建人 */
    private String createdBy;

    /** 创建时间 */
    private Date createdAt;

    /** 修改人 */
    private String updatedBy;

    /** 修改时间 */
    private Date updatedAt;

    /** 逻辑删除标志（0:正常 1:已删除） */
    private Integer deletedFlg;

    // Getter 和 Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public Integer getStockQty() {
        return stockQty;
    }

    public void setStockQty(Integer stockQty) {
        this.stockQty = stockQty;
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

    public Date getLastSalesDate() {
        return lastSalesDate;
    }

    public void setLastSalesDate(Date lastSalesDate) {
        this.lastSalesDate = lastSalesDate;
    }

    public Integer getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Integer totalSales) {
        this.totalSales = totalSales;
    }

    public String getStaff() {
        return staff;
    }

    public void setStaff(String staff) {
        this.staff = staff;
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

    public Integer getDeletedFlg() {
        return deletedFlg;
    }

    public void setDeletedFlg(Integer deletedFlg) {
        this.deletedFlg = deletedFlg;
    }
}
