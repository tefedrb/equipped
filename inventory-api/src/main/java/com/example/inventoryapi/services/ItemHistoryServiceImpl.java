package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Inventory;
import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.models.ItemHistory;
import com.example.inventoryapi.repositories.InventoryRepository;
import com.example.inventoryapi.repositories.ItemHistoryRepository;
import com.example.inventoryapi.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ItemHistoryServiceImpl implements ItemHistoryService{

    @Autowired
    ItemHistoryRepository itemHistoryRepository;

    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    ItemRepository itemRepository;

    @Override
    public ItemHistory addHistory(String username, Item item, Inventory inventory){
        ItemHistory history = new ItemHistory(username, new Date(), item, inventory);

        if(itemRepository.findById(item.getId()).isPresent()){
            Item retrieveItem = itemRepository.findById(item.getId()).get();
            retrieveItem.addToItemHistories(history);
            itemRepository.save(retrieveItem);
        }
        if(inventoryRepository.findById(inventory.getId()).isPresent()){
            Inventory retrieveInventory = inventoryRepository.findById(inventory.getId()).get();
            retrieveInventory.addToHistory(history);
            inventoryRepository.save(retrieveInventory);
        }

        return itemHistoryRepository.save(history);
    }

    @Override
    public Boolean updateHistory(Long id) {
       if(itemHistoryRepository.findById(id).isPresent()){
           ItemHistory targetHistory = itemHistoryRepository.findById(id).get();
           targetHistory.setReturn_date(new Date());
           itemHistoryRepository.save(targetHistory);
           return true;
       } else {
           return false;
       }
    }


}
