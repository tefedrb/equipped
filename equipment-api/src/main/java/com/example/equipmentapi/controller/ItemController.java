package com.example.equipmentapi.controller;

import com.example.equipmentapi.models.Item;
import com.example.equipmentapi.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public List<Item> getItemByCategoryName(@PathVariable String name){
        return itemService.getAllItemsByCategoryName(name);
    }
}
