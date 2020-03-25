package com.example.equipmentapi.controller;

import com.example.equipmentapi.models.Item;
import com.example.equipmentapi.repositories.ItemRepository;
import com.example.equipmentapi.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/hello")
    public String helloWorld(){
        return "Hello World!";
    }

    @GetMapping("/item/list")
    public Iterable<Item> listItems(){
        return itemService.listItems();
    }

    // Need to create a retrieve item info method
    @GetMapping("/item/{serial_num}")
    public Item getItemBySerial(@PathVariable Long serial_num){
        return itemService.getItemBySerial(serial_num);
    }
}
