package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Inventory;
import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.models.ItemHistory;
import com.example.inventoryapi.repositories.InventoryRepository;
import com.example.inventoryapi.repositories.ItemHistoryRepository;
import com.example.inventoryapi.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class ItemHistoryServiceImpl implements ItemHistoryService{

    @Autowired
    ItemHistoryRepository itemHistoryRepository;

    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    ItemRepository itemRepository;

    @Override
    public String generateHistory(){
        SimpleDateFormat eastern = new SimpleDateFormat("MM/dd/yyyy 'at' hh:mma 'ET'");
        TimeZone etTimeZone = TimeZone.getTimeZone("America/New_York");
        eastern.setTimeZone( etTimeZone );
        Date currentDate = new Date();
        return eastern.format(currentDate.getTime());
    }

    @Override
    public long generateUnixTime(){
        return System.currentTimeMillis() / 1000L;
    }

    @Override
    public ItemHistory addHistory(String username, Item item, Inventory inventory){
        ItemHistory history = new ItemHistory(username, this.generateHistory(), this.generateUnixTime(), item, item.getProduct(), inventory);
        if(itemRepository.findById(item.getId()).isPresent()){
            Item retrieveItem = itemRepository.findById(item.getId()).get();
            retrieveItem.addToItemHistories(history);
        }
        if(inventoryRepository.findById(inventory.getId()).isPresent()){
            Inventory retrieveInventory = inventoryRepository.findById(inventory.getId()).get();
            retrieveInventory.addToHistory(history);
        }
        return itemHistoryRepository.save(history);
    }

    @Override
    public Boolean returnItem(Long id) {
       if(itemHistoryRepository.findById(id).isPresent()){
           ItemHistory targetHistory = itemHistoryRepository.findById(id).get();
           // RETURNING ITEM
           targetHistory.setReturn_date(this.generateHistory());
           targetHistory.setUnix_return(this.generateUnixTime());
           itemHistoryRepository.save(targetHistory);
           return true;
       } else {
           return false;
       }
    }

    @Override
    public List<ItemHistory> getHistoryByInventoryId(Long id){
        try {
            return itemHistoryRepository.getHistoryByInventoryId(id);
        } catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public List<ItemHistory> getHistoryByInventoryIdLimit(Long id){
        try {
            return itemHistoryRepository.findByInventoryIdLimit50(id);
        } catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public HttpStatus deleteHistoryByInId(Long id) throws IllegalArgumentException{
       try {
           // Get all history associated with inventory (in a list)
           List<ItemHistory> retrieveHistory = itemHistoryRepository.getHistoryByInventoryId(id);
           // Get the inventory associated with the histories
           Inventory getInventory = retrieveHistory.get(0).getInventory();
           // Set the the itemHistories field of the inventory to null
           getInventory.setItemHistories(null);
           // Save the inventory
           inventoryRepository.save(getInventory);
           // For each history entry , get it's associated item and set its history to null
           // Also set each histories inventory to null
           retrieveHistory.forEach( itemHistory -> {
               Item item = itemHistory.getItem();
               itemHistory.setInventory(null);
               // Adding this... save each itemHistory after setting it's inventory to null.
               itemHistoryRepository.save(itemHistory);
               // Set associated items histories to null and then save
               item.setItemHistories(null);
               itemRepository.save(item);
           });
           itemHistoryRepository.deleteAll(retrieveHistory);
           return HttpStatus.OK;
       } catch (IllegalArgumentException e){
           System.out.println("Error in deleteHistoryByInId: " + e.getMessage());
           return HttpStatus.INTERNAL_SERVER_ERROR;
       }
    }
}
