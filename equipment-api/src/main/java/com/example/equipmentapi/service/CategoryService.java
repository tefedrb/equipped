package com.example.equipmentapi.service;

import com.example.equipmentapi.models.Category;

public interface CategoryService {
    Iterable<Category> listCategories();
    Category saveCategory(Category category);
}
