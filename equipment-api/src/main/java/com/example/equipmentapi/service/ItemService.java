package com.example.equipmentapi.service;

import com.example.equipmentapi.models.Item;

import java.util.List;

public interface ItemService {
    Iterable<Item> listItems();
    Item save(Item item);
    Item getItemBySerial(Long serial_num);
    List<Item> getAllItemsByCategoryName(String name);
    List<Item> getAllItemsBySubCategoryName(String name);
}
