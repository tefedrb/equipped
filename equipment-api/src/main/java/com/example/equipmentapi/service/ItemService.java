package com.example.equipmentapi.service;

import com.example.equipmentapi.models.Item;

public interface ItemService {
    public Iterable<Item> listItems();
    public Item save(Item item);
}
