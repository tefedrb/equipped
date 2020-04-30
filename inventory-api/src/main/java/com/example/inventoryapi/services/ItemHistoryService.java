package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Inventory;
import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.models.ItemHistory;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface ItemHistoryService {
    ItemHistory addHistory(String username, Item item, Inventory inventory);
    Boolean returnItem(Long id);
    List<ItemHistory> getHistoryByInventoryId(Long id);
    HttpStatus deleteHistoryByInId(Long id);
}
