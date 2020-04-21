package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Item;
import data.classes.ItemFromJson;
import org.springframework.http.HttpStatus;

public interface ItemService {
    Iterable<Item> listItems();
    // Here we will be communicating with our equipment-api (MONOLITHIC TESTING)
    ItemFromJson getItem(Long serial_num);
    HttpStatus deleteItem(Long itemId);
}
