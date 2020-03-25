package com.example.inventoryapi.controllers;

import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;

@RestController
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping("/items/test")
    public String sayHello(){
        return "Hello";
    }

//    @GetMapping("/items/item")
//    public Response testItemRetrieval(){
//        // Return the listenable future listener
//        ListenableFuture<Response> holdResponse = itemService.getItem("5");
//        holdResponse.addListener(() -> {
//            try {
//                Response response = holdResponse.get();
//            } catch(Exception e){
//                System.out.println("ASYNC ERROR " + e);
//            }
//
//        }, Executors.newCachedThreadPool());
//
//    }
    @GetMapping("/items/item/{serial_id}")
    public Item retrieveItem(@PathVariable Long serial_id){
        return itemService.getItem(serial_id);
    }
}
