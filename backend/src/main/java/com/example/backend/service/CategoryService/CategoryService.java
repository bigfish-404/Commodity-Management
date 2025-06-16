package com.example.backend.service.CategoryService;

import java.util.List;
import com.example.backend.entity.CategoryEntity;


public interface CategoryService {
    List<CategoryEntity> getAllCategories();
    void insertCategory(CategoryEntity categoryEntity);
}
