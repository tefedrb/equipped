package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Inventory;
import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.models.ItemHistory;
import com.example.inventoryapi.repositories.ItemHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ItemHistoryServiceImpl implements ItemHistoryService{

    @Autowired
    ItemHistoryRepository itemHistoryRepository;

    @Override
    public ItemHistory addHistory(String username, Item item, Inventory inventory){
        ItemHistory history = new ItemHistory(username, new Date(), item, inventory);
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
