package com.example.inventoryapi.controllers;

import com.example.inventoryapi.models.Inventory;
import com.example.inventoryapi.services.InventoryService;
import data.classes.ItemAndInventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    InventoryService inventoryService;

    @GetMapping("/listAll")
    public Iterable<Inventory> listAll(){
        return inventoryService.listInventories();
    }

    @PostMapping("/create")
    public Inventory createInventory(@RequestBody Inventory inventory){
        return inventoryService.createInventory(inventory);
    }

    @PostMapping("/add")
    public HttpStatus addToInventory(@RequestBody ItemAndInventory itemAndInventory){
        try {
            inventoryService.addItemToInventory(itemAndInventory);
            return HttpStatus.OK;
        } catch (Exception e){
            System.out.println(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @GetMapping("/retrieve/{company_id")
    public Inventory getInventoryByCompId(@PathVariable Long company_id){
        try {
            return inventoryService.retrieveInventory(company_id);
        } catch(Exception e){
            System.err.println("Error caught in InventoryController: " + e.getMessage());
        }
        return null;
    }

    @DeleteMapping("/delete/{inventoryId}")
    public HttpStatus deleteInventory(@PathVariable Long inventoryId){
        try {
            inventoryService.deleteInventory(inventoryId);
            return HttpStatus.OK;
        } catch(Exception e){
            System.err.println(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

}
