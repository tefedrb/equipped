package com.example.inventoryapi.repositories;

import com.example.inventoryapi.models.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Long> {

}
