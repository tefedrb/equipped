package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Item;
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
    public Item updateItemStatus(Item item){
        try {
            Item retrievedItem = itemRepository.findById(item.getId()).get();
            retrievedItem.setItemUser(item.getItemUser());
            retrievedItem.setAvailable(item.getAvailable());
            return itemRepository.save(retrievedItem);
        } catch(Exception e){
            System.err.println("Error in updateItemStatus: " + e.getMessage());
            return null;
        }
    }
}
