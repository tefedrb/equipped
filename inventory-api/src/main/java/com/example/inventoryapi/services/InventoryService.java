package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Inventory;
import com.example.inventoryapi.models.Item;

public interface InventoryService {
    public Iterable<Inventory> listInventories();
    // Here we are going to communicate with our equipment api
    public Item addItemToInventory(Item item);
    public Item removeItemFromInventory(Long itemId);
}
