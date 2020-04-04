package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Inventory;
import data.classes.ItemAndInventory;
import org.springframework.http.HttpStatus;

public interface InventoryService {
    Iterable<Inventory> listInventories();
    // Here we are going to communicate with our equipment api
    Inventory addItemToInventory(ItemAndInventory itemAndInventory);
    Inventory createInventory(Inventory inventory);
    HttpStatus deleteInventory(Long inventoryId);
}
