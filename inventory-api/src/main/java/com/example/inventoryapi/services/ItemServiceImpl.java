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
            Item retrievedItem = itemRepository.findById(item.getId()).get();
            String username = item.getItemUser();
            /// I need to get the history
            System.out.println(item.getAvailable() + " <------- WHAT IS HAPPENING?!?!?!??!?!");
            if (item.getAvailable()) {
                ItemHistory itemHistory = itemHistoryRepository
                        .getItemHistoryByItemIdAndReturnDateNull(retrievedItem.getId(), retrievedItem.getItemUser());
                //////////////////////NEEDS CONFIRMATION//////////////////////////////
                System.out.println(itemHistory.getUsername() + " <----- itemHistory obj user");
                System.out.println(itemHistory.getId() + " <----- itemHistory obj id");
                //////////////////////////////////////////////////////////////////////
                if (retrievedItem.getItemUser().equals(username) && itemHistory.getReturn_date() == null) {
                    // Adding item return date
                    // THIS IS RETURNING A BUNCH OF ENTRIES B/CUZ THE RETURN DATE IS NEVER SET
                    // findItemHistoryByUsernameAndId only returns an obj that doesn't have a return date
                    itemHistoryService.updateHistory(itemHistory.getId());
                }
            }
            /* If there is no user, or if the username for retrievedItem isn't the same,
            a new history gets created */
            if (retrievedItem.getItemUser() == null) {
                itemHistoryService
                        .addHistory(item.getItemUser(),
                                retrievedItem,
                                retrievedItem.getInventory());

            }

            retrievedItem.setItemUser(username);
            retrievedItem.setAvailable(item.getAvailable());
            return itemRepository.save(retrievedItem);
        } else {
            return null;
        }
    }


}
