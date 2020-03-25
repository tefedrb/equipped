package com.example.inventoryapi.repositories;

import com.example.inventoryapi.models.Inventory;
import org.springframework.data.repository.CrudRepository;

public interface InventoryRepository extends CrudRepository<Inventory, Long> {
}
