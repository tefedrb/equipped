package com.example.equippedbackend.Repository;

import com.example.equippedbackend.Model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
//    @Query("FROM User u WHERE u.username = ?1")
    @Query("FROM User u WHERE u.username = ?1")
    public User findByUserName(String username);
}
