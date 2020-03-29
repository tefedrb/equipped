package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Item;
import data.classes.ItemFromJson;
import org.springframework.http.HttpStatus;

public interface ItemService {
    public Iterable<Item> listItems();
    // Here we will be communicating with our equipment-api
    public ItemFromJson getItem(Long serial_num);
    public HttpStatus deleteItem(Long itemId);
}
