package com.example.equipmentapi.controller;

import com.example.equipmentapi.models.Category;
import com.example.equipmentapi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/category/list")
    public Iterable<Category> listCategories(){
        return categoryService.listCategories();
    }
}
