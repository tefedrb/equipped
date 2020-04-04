package com.usersapi.Service;

import com.usersapi.Model.Company;
import org.springframework.http.HttpStatus;

public interface CompanyService {
    HttpStatus createCompany(Company newCompany);
    HttpStatus deleteCompanyById(long companyId);
    HttpStatus updateCompany(long id, Company companyReq);

    Iterable<Company> getAllCompanies();
//  Iterable<Company> findCompanyByPerson(long id);
//  HttpStatus verifyUser(Integer userId, Company company);
//  HttpStatus findCompany(Long id);
    Company findByUser();
}
