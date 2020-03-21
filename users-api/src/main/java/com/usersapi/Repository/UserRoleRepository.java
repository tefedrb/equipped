package com.usersapi.Repository;

import com.usersapi.Model.UserRole;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends CrudRepository<UserRole, Long> {
    // I should be able to use findByRoleType here
//    @Query("From UserRole r WHERE r.roleType = ?1")
    public UserRole findByRoleType(String roleType);
}
