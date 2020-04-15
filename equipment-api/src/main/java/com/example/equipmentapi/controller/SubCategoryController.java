package com.example.equipmentapi.controller;

import com.example.equipmentapi.models.SubCategory;
import com.example.equipmentapi.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
