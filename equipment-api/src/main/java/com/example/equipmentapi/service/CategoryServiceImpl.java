package com.example.equipmentapi.service;

import com.example.equipmentapi.models.Category;
import com.example.equipmentapi.repositories.CategoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Iterable<Category> listCategories(){
        return categoryRepository.findAll();
    }

    @Override
    public Category saveCategory(Category category){
        return categoryRepository.save(category);
    }

}
