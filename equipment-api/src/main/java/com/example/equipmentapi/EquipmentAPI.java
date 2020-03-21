package com.example.equipmentapi;

import com.example.equipmentapi.models.Category;
import com.example.equipmentapi.models.Item;
import com.example.equipmentapi.models.SubCategory;
import com.example.equipmentapi.service.CategoryService;
import com.example.equipmentapi.service.ItemService;
import com.example.equipmentapi.service.SubCategoryService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.*;
import java.text.NumberFormat;
import java.util.*;

@SpringBootApplication
public class EquipmentAPI {

	public static void main(String[] args) {
		SpringApplication.run(EquipmentAPI.class, args);
	}

	@Autowired
	CategoryService categoryService;

	@Autowired
	ItemService itemService;

	@Autowired
	SubCategoryService subCategoryService;

	@Bean
	CommandLineRunner runner(){
		return args -> {
			ObjectMapper objectMapper = new ObjectMapper();
			try {
				// Data binding - JSON to JsonNode Tree via ObjectMapper
				JsonNode scrapeTree = objectMapper.readTree(new FileInputStream("src/main/resources/json/adoramaScrape.json"));
				// POPULATE DB WITH JSON DATA:
				// Loop -> grab/build/save main category.
				// Loop -> grab/build/save sub-category.
				// Loop -> grab/build/save items.

				Iterator<String> allFields = scrapeTree.fieldNames();
				List<String> categoryList = new ArrayList<>();
				allFields.forEachRemaining(categoryList::add);
				for(int i = 0; i < categoryList.size(); i++){
					// iterate over main category / build & save model
					String categoryName = categoryList.get(i);
					Category category = new Category();
					category.setName(categoryName);
					categoryService.saveCategory(category);
					// Get all subCategory strings - turn into Arraylist from Iterator
					Iterator<String> subCategories = scrapeTree.findPath(categoryName).fieldNames();
					List<String> subCategoryList = new ArrayList<>();
					subCategories.forEachRemaining(subCategoryList::add);
					for(int j = 0; j < subCategoryList.size(); j++){
						// iterate over sub category / build & save model
						String subCatName = subCategoryList.get(j);
						SubCategory subCategory = new SubCategory();
						subCategory.setName(subCatName);
						// SETTING RELATION TO CATEGORY
						subCategory.setCategory(category);
						subCategoryService.saveSubCategory(subCategory);
						// Turn sub-category items into ArrayNode list
						ArrayNode items = (ArrayNode) scrapeTree.get(categoryName).get(subCatName);
						// Iterate and save each item - including current sub/main cat name
						for(int k = 0; k < items.size(); k++) {
							// WILL EVENTUALLY WANT TO CUT THIS DOWN BY PERHAPS MAPPING TO ITEM CLASS
							try {
								JsonNode currentItem = items.get(k);
								Item currentItemModel = new Item();
								// Pull attributes out of currentItem save to currentItemModel
								String image = currentItem.get("image").toString();
								String product = currentItem.get("product").toString();
								String prodLink = currentItem.get("prodLink").toString();
								// Prep value string for parseFloat
								String stringVal = currentItem.get("value")
										.textValue()
										.replaceAll("[$,]", "");
								// Convert stringVal to float
								float value = Float.parseFloat(stringVal);
								currentItemModel.setImage(image);
								currentItemModel.setProduct(product);
								currentItemModel.setProdLink(prodLink);
								currentItemModel.setValue(value);
								// SETTING RELATIONS
								currentItemModel.setCategory(category);
								currentItemModel.setSubCategory(subCategory);
								itemService.save(currentItemModel);
							} catch(Exception e){
								System.out.println("Item Error: " + e);
							}
						}
					}
				}
			} catch(Exception e) {
				System.out.println("Error!!!: " + e.getMessage());
			}
		};
	}
}
