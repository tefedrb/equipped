package com.example.equipmentapi.controller;

import com.example.equipmentapi.models.Item;
import com.example.equipmentapi.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/hello")
    public String helloWorld(){
        return "Hello World!";
    }

    @GetMapping("/item/list")
    public Iterable<Item> listItems(){
        return itemService.listItems();
    }
}
