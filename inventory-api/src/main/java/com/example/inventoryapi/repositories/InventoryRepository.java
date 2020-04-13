package com.example.inventoryapi.repositories;

import com.example.inventoryapi.models.Inventory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface InventoryRepository extends CrudRepository<Inventory, Long> {
    @Query("FROM Inventory i WHERE i.company_id = ?1")
    Inventory retrieveInventory(Long company_id);
}
