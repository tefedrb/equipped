package com.example.usersapi.Repository;

import com.example.usersapi.Model.Company;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {
//    @Query("SELECT * FROM Company c WHERE User user_company = c.id")
//    @Query("FROM User u WHERE u.username = ?1")

//    @Query("FROM Person p WHERE p.username = ?1 and p.password = ?2")
//    public Person login(String username, String password);

    // Below is test code
//    @Query("FROM Company c WHERE c.id = ?1")
//    public Company findByUser(long id);
}
