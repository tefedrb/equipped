package com.usersapi.Service;

import com.usersapi.Model.Company;
import org.springframework.http.HttpStatus;

public interface CompanyService {
    HttpStatus createCompany(Company newCompany);
    HttpStatus deleteCompanyById(Long companyId);
    HttpStatus updateCompany(Long id, Company companyReq);

    Iterable<Company> getAllCompanies();
//  Iterable<Company> findCompanyByPerson(long id);
//  HttpStatus verifyUser(Integer userId, Company company);
    Company getCompanyById(Long id);
    Company findByUser();
    Company findByWaitListId(Long id);
}
