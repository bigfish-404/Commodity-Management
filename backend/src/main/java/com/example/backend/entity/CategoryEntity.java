package com.example.backend.entity;
import java.util.Date;

public class CategoryEntity {
    private Long id;
    private String categoryName;
    private String description;
    private String createdBy;
    private Date createdAt;
    public void setId(Long id) {
        this.id = id;
    }
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public void setDescription(String description) {
        this.description = description;
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
    public Long getId() {
        return id;
    }
    public String getCategoryName() {
        return categoryName;
    }
    public String getDescription() {
        return description;
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
    private String updatedBy;
    private Date updatedAt;
    
}
