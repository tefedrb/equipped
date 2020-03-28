package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Inventory;
import data.classes.ItemAndInventory;
import org.springframework.http.HttpStatus;

public interface InventoryService {
    public Iterable<Inventory> listInventories();
    // Here we are going to communicate with our equipment api
    public Inventory addItemToInventory(ItemAndInventory itemAndInventory);
    public Inventory createInventory(Inventory inventory);
    public HttpStatus deleteInventory(Long inventoryId);
}
