package com.example.inventoryapi.controllers;

import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping("/test")
    public String sayHello(){
        return "Hello";
    }

    // METHOD SAVED FOR MONOLITHIC TESTING
//    @GetMapping("/retrieve/{serial_id}")
//    public ItemFromJson retrieveItem(@PathVariable Long serial_id){
//        try {
//            return itemService.getItem(serial_id);
//        } catch (Exception e) {
//            System.err.println(e.getMessage());
//            return null;
//        }
//    }

    @PutMapping("/update-item")
    public ResponseEntity<Item> updateItem(@RequestBody Item item){
        return ResponseEntity.ok(itemService.updateItemStatus(item));
    }

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteItem(@PathVariable Long id){
        try {
            itemService.deleteItem(id);
            return HttpStatus.OK;
        } catch (IllegalArgumentException e) {
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
