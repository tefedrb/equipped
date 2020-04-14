package com.example.inventoryapi.services;

import com.example.inventoryapi.itemRetrieval.ItemServiceFeign;
import com.example.inventoryapi.models.Inventory;
import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.repositories.InventoryRepository;
import com.example.inventoryapi.repositories.ItemRepository;
import data.classes.ItemFromJson;
import data.classes.ItemAndInventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    ItemServiceFeign itemServiceFeign;

    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    ItemRepository itemRepository;

    @Override
    public Iterable<Inventory> listInventories(){
        return inventoryRepository.findAll();
    }

    @Override
    public Inventory addItemToInventory(ItemAndInventory itemAndInventory){
        try {
            Long inventory_id = itemAndInventory.getInventory_id();
            Long item_serial_id = itemAndInventory.getSerial_id();
            Inventory inventory = inventoryRepository.findById(inventory_id).get();
            // Here, again, I am wondering about asynchronicity and thread safety
            // (BELOW) THIS IS HERE FOR MONOLITHIC TESTING
//            ItemRetrieval requestedItem = new ItemRetrieval();
//            ItemFromJson itemJ = requestedItem.run(item_serial_id);
            ItemFromJson requestedItem = itemServiceFeign.getItemBySerial(item_serial_id);
            // This doesn't seem like it follows DRY principles.
            // there should be a way to create an item within our ItemRetrieval instead
            // of a ItemFromJson
            Item item = new Item(
                    requestedItem.getSerial_num(),
                    true, requestedItem.getImage(),
                    requestedItem.getProdLink(),
                    requestedItem.getValue(),
                    requestedItem.getCategory().getName(),
                    requestedItem.getSubCategory().getName());
            // Adding Item to inventory
            item.setInventory(inventory);
            itemRepository.save(item);
            inventory.addItems(item);
            return inventoryRepository.save(inventory);
        } catch(Exception e) {
            System.err.println("ERROR in addItemToInventory : inventory-api service: " + e.getMessage());
        }
        return null;
    }

    @Override
    public Inventory createInventory(Inventory inventory){
        return inventoryRepository.save(inventory);
    }

    @Override
    public HttpStatus deleteInventory(Long inventoryId){
        try {
            inventoryRepository.deleteById(inventoryId);
            return HttpStatus.OK;
        } catch (Exception e){
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Override
    public Inventory retrieveInventory(Long company_id){
        try {
            return inventoryRepository.retrieveInventory(company_id);
        } catch (Exception e){
            System.err.println("Error caught in retrieveInventory(): " + e.getMessage());
        }
        return null;
    }
}
