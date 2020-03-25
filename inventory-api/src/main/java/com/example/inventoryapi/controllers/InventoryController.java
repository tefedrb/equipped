package com.example.inventoryapi.controllers;

import com.example.inventoryapi.models.Inventory;
import com.example.inventoryapi.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InventoryController {
    @Autowired
    InventoryService inventoryService;

    @GetMapping("/inventory/listall")
    public Iterable<Inventory> listAll(){
        return inventoryService.listInventories();
    }


}
