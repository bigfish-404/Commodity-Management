package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.db.CategoryEntity;
import com.example.backend.service.CategoryService.CategoryService;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoriService;

    @PostMapping("/addCategori")
    public void addCategori(@RequestBody CategoryEntity categoryEntity){
        categoriService.insertCategory(categoryEntity);
    }

    @GetMapping("/getAllCategories")
    public List<CategoryEntity> getAllCategory(@RequestParam("userId") String userId){
        List<CategoryEntity> list = categoriService.getAllCategories(userId);
        return list;
    }

    @PostMapping("/updateCategory")
    public int updateCategory(@RequestBody CategoryEntity categoryEntity){
        return categoriService.updateCategory(categoryEntity);
    }     

    @PostMapping("/deleteCategory")
    public int deleteCategory(@RequestParam("id") Long id){
        return categoriService.deleteCategory(id);
    }   

}
