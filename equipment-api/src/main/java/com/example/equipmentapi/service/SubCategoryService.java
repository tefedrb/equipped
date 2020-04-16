package com.example.equipmentapi.service;

import com.example.equipmentapi.models.SubCategory;

import java.util.List;

public interface SubCategoryService {
    Iterable<SubCategory> listSubCategories();
    SubCategory saveSubCategory(SubCategory subCategory);
    List<SubCategory> findSubCategoriesByCategoryName(String name);
}
