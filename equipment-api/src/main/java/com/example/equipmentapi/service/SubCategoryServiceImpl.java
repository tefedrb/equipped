package com.example.equipmentapi.service;

import com.example.equipmentapi.models.SubCategory;
import com.example.equipmentapi.repositories.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<SubCategory> findSubCategoriesByCategoryName(String name){
        try {
            return subCategoryRepository.findSubCategoriesByCategoryName(name);
        } catch (Exception e){
            System.err.println("Error in SubCatService " + e.getMessage());
        }
        return new ArrayList<>();
    }

    @Override
    public List<SubCategory> findSubCategoriesByCategoryId(Long id){
        try{
            return subCategoryRepository.findSubCategoriesByCategoryId(id);
        } catch (Exception e){
            System.err.println("Error in findSubCategoriesByCategoryIdl " + e.getMessage());
        }
        return new ArrayList<>();
    }
}
