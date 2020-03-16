package com.example.equipmentapi.service;

import com.example.equipmentapi.models.SubCategory;
import com.example.equipmentapi.repositories.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {
    @Autowired
    SubCategoryRepository subCategoryRepository;

    @Override
    public Iterable<SubCategory> listSubCategories(){
        return subCategoryRepository.findAll();
    }

    @Override
    public SubCategory saveSubCategory(SubCategory subCategory){
        return subCategoryRepository.save(subCategory);
    }

}
