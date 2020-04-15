package com.example.equipmentapi.repositories;

import com.example.equipmentapi.models.Item;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ItemRepository extends CrudRepository<Item, Long> {
    @Query("FROM Item it WHERE it.serial_num = ?1")
    Item findItemBySerial(Long serial_num);

    @Query("FROM Item it JOIN Category ca ON it.category.id = ca.id WHERE ca.category_name = ?1")
    List<Item> getAllItemsByCategoryName(String name);
}
