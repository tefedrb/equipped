package com.example.equipmentapi.repositories;

import com.example.equipmentapi.models.Item;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Long> {
    @Query("FROM Item it WHERE it.serial_num = ?1")
    public Item findItemBySerial(Long serial_num);
}
