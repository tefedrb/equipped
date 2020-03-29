package com.example.equipmentapi.service;

import com.example.equipmentapi.models.Category;
import com.example.equipmentapi.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
