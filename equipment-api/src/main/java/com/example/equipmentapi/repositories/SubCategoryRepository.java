package com.example.equipmentapi.repositories;

import com.example.equipmentapi.models.SubCategory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SubCategoryRepository extends CrudRepository<SubCategory, Long> {
    @Query("FROM SubCategory sc JOIN Category ca ON ca.id = sc.category.id WHERE ca.category_name = ?1")
    List<SubCategory> findSubCategoriesByCategoryName(String name);
}
