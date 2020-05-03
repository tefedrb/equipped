package com.example.inventoryapi.repositories;

import com.example.inventoryapi.models.ItemHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemHistoryRepository extends CrudRepository<ItemHistory, Long> {

    @Query("FROM ItemHistory ih WHERE ih.item.id = ?1 AND ih.username = ?2 AND ih.return_date IS NULL")
    ItemHistory getItemHistoryByItemIdAndReturnDateNull(Long id, String username);

    @Query("FROM ItemHistory ih WHERE ih.inventory.inventory_id = ?1")
    List<ItemHistory> getHistoryByInventoryId(Long id);

    @Query("FROM ItemHistory ih WHERE ih.inventory.inventory_id = ?1 ORDER BY unix_reserve LIMIT 50")
    List<ItemHistory> getHistoryByInventoryId50(Long id);
}
