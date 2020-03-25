package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Item;

public interface ItemService {
    public Iterable<Item> listItems();
    // Here we will be communicating with our equipment api
     public Item getItem(Long serial_num);
}
