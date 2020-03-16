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
import java.util.*;
import java.util.function.Consumer;

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
				// Data binding - JSON to Map via ObjectMapper
				JsonNode scrapeTree = objectMapper.readTree(new FileInputStream("src/main/resources/json/adoramaScrape.json"));

				// Loop -> grab main category.
				// Loop -> grab sub-category.
				// Loop -> grab items.

				// Also map to get all main category names - insert as path - and iterate the rest
//				for(JsonNode nodes : scrapeTree){
					ArrayNode items1 = (ArrayNode) scrapeTree.get("cameras").get("Digital Cinema Cameras");
//					System.out.println("HERE -> " + items1.get(1));
//				System.out.println(scrapeTree.findPath);
//					System.out.println(scrapeTree.get("cameras").get("Digital Cinema Cameras"));
//					System.out.println(scrapeTree.fields());

				Iterator<String> allFields = scrapeTree.fieldNames();

				// This returns CAMERAS - partially solves my issue of getting key strings
				List<String> categoryList = new ArrayList<>();
				allFields.forEachRemaining(categoryList::add);
				for(int i = 0; i < categoryList.size(); i++){
					// iterate over main category / save
					String categoryName = categoryList.get(i);
					Category category = new Category();
					category.setName(categoryName);
					categoryService.saveCategory(category);
//					System.out.println(scrapeTree.findPath(mainCategoryName));
//					System.out.println(categoryName + " ---> Subs ");
//					System.out.println("--------------------");
					// Get all sub-categories (strings) save into iterator (iterate) transfer to List
					Iterator<String> subCategories = scrapeTree.findPath(categoryName).fieldNames();
					List<String> subCategoryList = new ArrayList<>();
					subCategories.forEachRemaining(subCategoryList::add);
					for(int j = 0; j < subCategoryList.size(); j++){
						String subCatName = subCategoryList.get(j);
						SubCategory subCategory = new SubCategory();
						subCategory.setName(subCatName);
						// SETTING RELATION
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
								// In the future might want to change this to int
								String value = currentItem.get("value").toString();
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

//					subCategories.forEachRemaining(System.out::println);
//					System.out.println(" ");
					// turn sub categories into ArrayNode
//					ArrayNode subCategory = (ArrayNode) scrapeTree.get(mainCategoryName);
//					System.out.println(subCategory.get(1));
				}


//					System.out.println(scrapeTree.fieldNames().toString());
//					System.out.println("uh");
//				}

//				Map<?, ?> map = objectMapper.readValue(new FileInputStream("src/main/resources/json/adoramaScrape.json"), Map.class);
//				for (Map.Entry<?, ?> mainCat : map.entrySet()) {
//					// Grabbing the key of each entry as string (they are category names)
//					String categoryName = (String) mainCat.getKey();
//					Category category = new Category();
//					category.setName(categoryName);
//					categoryService.saveCategory(category);
//					// Loop over sub-categories
//
//					}
//
			} catch(Exception e) {
				System.out.println("Error!!!: " + e.getMessage());
			}

		};
	}
}
