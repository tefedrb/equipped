package com.example.equipmentapi.service;

import com.example.equipmentapi.models.Item;
import com.example.equipmentapi.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
