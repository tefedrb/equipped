package com.example.equipmentapi.service;

import com.example.equipmentapi.models.SubCategory;

public interface SubCategoryService {
    Iterable<SubCategory> listSubCategories();
    SubCategory saveSubCategory(SubCategory subCategory);
}
