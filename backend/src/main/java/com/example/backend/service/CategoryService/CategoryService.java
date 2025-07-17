package com.example.backend.service.CategoryService;

import java.util.List;

import com.example.backend.entity.db.CategoryEntity;


public interface CategoryService {
    List<CategoryEntity> getAllCategories(String userId);
    void insertCategory(CategoryEntity categoryEntity);
    int updateCategory(CategoryEntity categoryEntity);
    int deleteCategory(Long id);
}
