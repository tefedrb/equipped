package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Inventory;
import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.models.ItemHistory;

import java.util.List;

public interface ItemHistoryService {
    ItemHistory addHistory(String username, Item item, Inventory inventory);
    Boolean updateHistory(Long id);
    List<ItemHistory> getHistoryByInventoryId(Long id);
}
