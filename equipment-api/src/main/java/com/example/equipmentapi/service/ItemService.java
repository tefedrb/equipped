package com.example.equipmentapi.service;

import com.example.equipmentapi.models.Item;

public interface ItemService {
    Iterable<Item> listItems();
    Item save(Item item);
    Item getItemBySerial(Long serial_num);
}
