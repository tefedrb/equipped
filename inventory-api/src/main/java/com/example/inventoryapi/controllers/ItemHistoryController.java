package com.example.inventoryapi.controllers;

import com.example.inventoryapi.models.ItemHistory;
import com.example.inventoryapi.services.InventoryService;
import com.example.inventoryapi.services.ItemHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/item-history")
public class ItemHistoryController {

    @Autowired
    InventoryService inventoryService;

    @Autowired
    ItemHistoryService itemHistoryService;

    @GetMapping("/list/{id}")
    public List<ItemHistory> getHistoryByInventoryId(@PathVariable Long id){
        return itemHistoryService.getHistoryByInventoryId(id);
    }

    @GetMapping("/list-50-order/{id}")
    public List<ItemHistory> getHistoryByInventoryId50(@PathVariable Long id){
        return itemHistoryService.getHistoryByInventoryIdLimit(id);
    }

    @PutMapping("/delete/{id}")
    public HttpStatus deleteHistoryByInId(@PathVariable Long id){
        return itemHistoryService.deleteHistoryByInId(id);
    }
}
