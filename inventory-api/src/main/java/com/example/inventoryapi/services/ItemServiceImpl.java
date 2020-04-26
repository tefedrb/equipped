package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.models.ItemHistory;
import com.example.inventoryapi.repositories.ItemHistoryRepository;
import com.example.inventoryapi.repositories.ItemRepository;
import data.classes.ItemFromJson;
import data.classes.ItemRetrieval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemHistoryService itemHistoryService;

    @Autowired
    ItemHistoryRepository itemHistoryRepository;

    @Override
    public Iterable<Item> listItems() {
        return itemRepository.findAll();
    }

    @Override
    public HttpStatus deleteItem(Long itemId){
        try {
            Item item = itemRepository.findById(itemId).get();
            System.out.println(item.getProduct() + "ITEM!!!!");
            item.getInventory().removeItemById(itemId);
            item.setInventory(null);
            itemRepository.deleteById(itemId);
            return HttpStatus.OK;
        } catch (Exception e){
            System.err.println(e.getMessage());
            return HttpStatus.BAD_REQUEST;
        }
    }

    // METHOD SAVED FOR MONOLITHIC TESTING
    @Override
    public ItemFromJson getItem(Long serial_num){
        try {
            ItemRetrieval itemRetrieval = new ItemRetrieval();
            //This method produces GET request
            return itemRetrieval.run(serial_num);
        } catch (Exception e){
            System.err.println("Error in getItem: " + e.getMessage());
            return null;
        }
    }

    @Override
    public Item updateItemStatus(Item item) {
        if (itemRepository.findById(item.getId()).isPresent()) {
            try {
                Item retrievedItem = itemRepository.findById(item.getId()).get();
                String username = item.getItemUser();
                /* If there is no user, or if the username for retrievedItem isn't the same,
                a new history gets created */
                if (retrievedItem.getItemUser() == null || !retrievedItem.getItemUser().equals(username)) {
                    itemHistoryService
                            .addHistory(item.getItemUser(),
                                    retrievedItem,
                                    retrievedItem.getInventory());
                } else if (retrievedItem.getItemUser().equals(username)) {
                    // Adding item return date
                    ItemHistory itemHistory = itemHistoryRepository
                            .findItemHistoryByUsernameAndId(username, retrievedItem.getId());
                    itemHistoryService.updateHistory(itemHistory.getId());
                }
                retrievedItem.setItemUser(username);
                retrievedItem.setAvailable(item.getAvailable());
                return itemRepository.save(retrievedItem);
            } catch (Exception e) {
                System.err.println("Error in updateItemStatus: " + e.getMessage());
                return null;
            }
        } else {
            return null;
        }
    }
}
