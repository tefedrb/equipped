package com.example.equippedbackend.Repository;

import com.example.equippedbackend.Model.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long>{

}
