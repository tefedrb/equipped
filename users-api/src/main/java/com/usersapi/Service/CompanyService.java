package com.usersapi.Service;

import com.usersapi.Model.Company;
import org.springframework.http.HttpStatus;

public interface CompanyService {
    public HttpStatus createCompany(Company newCompany);
    public HttpStatus deleteCompanyById(long companyId);
    public HttpStatus updateCompany(long id, Company companyReq);

    public Iterable<Company> getAllCompanies();
//    public Iterable<Company> findCompanyByPerson(long id);
//    public HttpStatus verifyUser(Integer userId, Company company);
//    public HttpStatus findCompany(Long id);
    public Company findByUser();
}
