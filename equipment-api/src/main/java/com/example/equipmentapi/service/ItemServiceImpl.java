package com.example.equipmentapi.service;

import com.example.equipmentapi.models.Item;
import com.example.equipmentapi.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    private ItemRepository itemRepository;

    @Override
    public Iterable<Item> listItems() {
        return itemRepository.findAll();
    }

    @Override
    public Item save(Item item){
        return itemRepository.save(item);
    }

//    public Iterable<Item> save(Iterable<Item> items){
//        return itemRepository.save(items);
//    }

    @Override
    public List<Item> getAllItemsByCategoryName(String name){
        try {
            return itemRepository.getAllItemsByCategoryName(name);
        } catch (Exception e){
            System.err.println(e.getMessage());
        }
        return new ArrayList<>();
    }

    @Override
    public List<Item> getAllItemsBySubCategoryName(String name){
        try {
            return itemRepository.getAllItemsBySubCategoryName(name);
        } catch (Exception e){
            System.err.println("Error in ItemService " + e.getMessage());
        }
        return new ArrayList<>();
    }


    @Override
    public Item getItemBySerial(Long serial_num){
        return itemRepository.findItemBySerial(serial_num);
    }
}
