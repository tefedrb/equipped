package com.example.equipmentapi.controller;

import com.example.equipmentapi.models.SubCategory;
import com.example.equipmentapi.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubCategoryController {
    @Autowired
    private SubCategoryService subCategoryService;

    @GetMapping("/subCategory/list")
    public Iterable<SubCategory> listSubCategories(){
        return subCategoryService.listSubCategories();
    }
}
