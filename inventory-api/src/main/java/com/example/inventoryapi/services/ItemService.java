package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Item;
import data.classes.ItemFromJson;

public interface ItemService {
    public Iterable<Item> listItems();
    // Here we will be communicating with our equipment api
     public ItemFromJson getItem(Long serial_num);
}
