package com.example.equipmentapi.service;

import com.example.equipmentapi.models.Category;

public interface CategoryService {
    public Iterable<Category> listCategories();
    public Category saveCategory(Category category);
}
