package com.example.inventoryapi.repositories;

import com.example.inventoryapi.models.ItemHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemHistoryRepository extends CrudRepository<ItemHistory, Long> {
// Find by item id and user // and where ItemHistory return date == null
    @Query("FROM ItemHistory ih, Item i WHERE ih.username = ?1 AND i.id = ?2 AND ih.return_date IS NULL")
    ItemHistory findItemHistoryByUsernameAndId(String username, Long id);
}
