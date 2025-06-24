package com.example.backend.service.CategoryService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.db.CategoryEntity;
import com.example.backend.mapper.CategoryMapper;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public List<CategoryEntity> getAllCategories(String userId){
        return  categoryMapper.getAllCategories(userId);
    }

    @Override
    public void insertCategory(CategoryEntity categoryEntity){
        categoryMapper.insertCategory(categoryEntity);
        
    }
}
