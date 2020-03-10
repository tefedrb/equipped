package com.example.equipmentapi.repositories;

import com.example.equipmentapi.models.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Long> {

}
