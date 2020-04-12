package com.usersapi.Repository;

import com.usersapi.Model.Company;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {
    @Query("FROM Company c WHERE c.name = ?1")
    Company findCompanyByName(String name);

    @Query("FROM Company c WHERE c.waitList.id = ?1")
    Company findCompanyByWaitListId(Long id);
}
