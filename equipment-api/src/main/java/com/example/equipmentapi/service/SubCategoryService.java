package com.example.equipmentapi.service;

import com.example.equipmentapi.models.SubCategory;

public interface SubCategoryService {
    public Iterable<SubCategory> listSubCategories();
    public SubCategory saveSubCategory(SubCategory subCategory);
}
