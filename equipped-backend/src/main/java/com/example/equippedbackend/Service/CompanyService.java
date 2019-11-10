package com.example.equippedbackend.Service;

import com.example.equippedbackend.Model.Company;
import org.springframework.http.HttpStatus;

public interface CompanyService {
    public HttpStatus createCompany(Company newCompany);
    public HttpStatus deleteCompanyById(long companyId);
    public HttpStatus updateCompany(long id, Company companyReq);

    public Iterable<Company> getAllCompanies();
//    public Iterable<Company> findCompanyByPerson(long id);
}
