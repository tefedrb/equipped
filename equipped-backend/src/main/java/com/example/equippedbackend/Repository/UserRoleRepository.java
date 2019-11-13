package com.example.equippedbackend.Repository;

import com.example.equippedbackend.Model.UserRole;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends CrudRepository<UserRole, Long> {
    @Query("From UserRole r WHERE r.roleType = ?1")
    public UserRole findByName(String name);
}
