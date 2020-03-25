package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Inventory;
import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    InventoryRepository inventoryRepository;

    public Iterable<Inventory> listInventories(){
        return inventoryRepository.findAll();
    }

    @Override
    public Item addItemToInventory(Item item) {
        return null;
    }

    @Override
    public Item removeItemFromInventory(Long itemId) {
        return null;
    }
}
