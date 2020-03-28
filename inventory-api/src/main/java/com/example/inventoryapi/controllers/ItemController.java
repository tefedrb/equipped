package com.example.inventoryapi.controllers;

import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.services.ItemService;
import data.classes.ItemFromJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping("/test")
    public String sayHello(){
        return "Hello";
    }

    @GetMapping("/retrieve/{serial_id}")
    public ItemFromJson retrieveItem(@PathVariable Long serial_id){
        try {
            return itemService.getItem(serial_id);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteItem(@PathVariable Long id){
        try {
            itemService.deleteItem(id);
            return HttpStatus.OK;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/listAll")
    public Iterable<Item> listAllItems(){
        try {
            return itemService.listItems();
        } catch (Exception e){
            System.err.println(e.getMessage());
            return null;
        }
    }
}
