package com.example.inventoryapi.controllers;

import com.example.inventoryapi.models.ItemHistory;
import com.example.inventoryapi.services.InventoryService;
import com.example.inventoryapi.services.ItemHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/item-history")
public class ItemHistoryController {
    // Get all history from inventory // Get all items based on history
    @Autowired
    InventoryService inventoryService;

    @Autowired
    ItemHistoryService itemHistoryService;

    @GetMapping("/list/{id}")
    public List<ItemHistory> getHistory(@PathVariable Long id){
        /*
                To optimize for front end usage - an idea would be to organize the list
            So that history entries that are full (have a take out / return date)
            Are placed at the beginning of the array. This can allow the front-end
            to perhaps creating a caching system to more easily check if there is
            a difference between histories (arrays).
         */
        return itemHistoryService.getHistoryByInventoryId(id);
    }
}
