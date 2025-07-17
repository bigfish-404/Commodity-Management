package com.example.backend.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.example.backend.entity.db.CategoryEntity;

@Mapper
public interface CategoryMapper {

    void insertCategory (CategoryEntity categoryEntity);

    List<CategoryEntity> getAllCategories(String userId);

    int updateCategory(CategoryEntity categoryEntity);

    int deleteCategory(Long id);
} 