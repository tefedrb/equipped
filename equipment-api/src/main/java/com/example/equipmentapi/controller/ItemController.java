package com.example.equipmentapi.controller;

import com.example.equipmentapi.models.Item;
import com.example.equipmentapi.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/hello")
    public String helloWorld(){
        return "Hello World!";
    }

    @GetMapping("/list")
    public Iterable<Item> listItems(){
        return itemService.listItems();
    }

    // Need to create a retrieve item info method
    @GetMapping("/{serial_num}")
    public Item getItemBySerial(@PathVariable Long serial_num){
        return itemService.getItemBySerial(serial_num);
    }

    @GetMapping("/list-by-category-name/{name}")
    public List<Item> getItemsByCategoryName(@PathVariable String name){
        return itemService.getAllItemsByCategoryName(name);
    }

    @GetMapping("/list-by-sub-category-name/{name}")
    public List<Item> getItemsBySubCategoryName(@PathVariable String name){
        return itemService.getAllItemsBySubCategoryName(name);
    }

    @GetMapping("/list-by-sub-category-id/{id}")
    public List<Item> getItemsBySubCategoryId(@PathVariable Long id){
        return itemService.getAllItemsBySubCategoryId(id);
    }
}
