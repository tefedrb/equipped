package com.example.inventoryapi.repositories;

import com.example.inventoryapi.models.ItemHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemHistoryRepository extends CrudRepository<ItemHistory, Long> {

    @Query("FROM ItemHistory ih WHERE ih.item.id = ?1 AND ih.username = ?2 AND ih.return_date IS NULL")
    ItemHistory getItemHistoryByItemIdAndReturnDateNull(Long id, String username);

    @Query("FROM ItemHistory ih WHERE ih.inventory.inventory_id = ?1")
    List<ItemHistory> getHistoryByInventoryId(Long id);

    @Query(nativeQuery = true, value ="SELECT * FROM item_history ih WHERE ih.inventory_inventory_id = :id ORDER BY ih.unix_reserve DESC LIMIT 50")
    List<ItemHistory> findByInventoryIdLimit50(@Param("id") long id);
}
