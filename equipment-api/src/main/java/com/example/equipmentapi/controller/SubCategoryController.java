package com.example.equipmentapi.controller;

import com.example.equipmentapi.models.SubCategory;
import com.example.equipmentapi.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/sub-category")
public class SubCategoryController {

    @Autowired
    private SubCategoryService subCategoryService;

    @GetMapping("/list")
    public Iterable<SubCategory> listSubCategories(){
        return subCategoryService.listSubCategories();
    }

    @GetMapping("/list-by-category/{name}")
    public List<SubCategory> getSubCategoriesByCategory(@PathVariable String name){
        return subCategoryService.findSubCategoriesByCategoryName(name);
    }
}
