package com.usersapi.Repository;

import com.usersapi.Model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Query("FROM User u WHERE u.username = ?1")
    User findByUsername(String username);

    @Query("FROM User u WHERE u.company.id = ?1")
    List<User> findAllUsersByCompanyId(Long id);
}
