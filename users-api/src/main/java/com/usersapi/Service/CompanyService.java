package com.usersapi.Service;

import com.usersapi.Model.Company;
import com.usersapi.Model.User;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;

public interface CompanyService {
    HttpStatus createCompany(Company newCompany);
    HttpStatus deleteCompanyById(Long companyId);
    HttpStatus updateCompany(Long id, Company companyReq);

    Iterable<Company> getAllCompanies();

    Company getCompanyById(Long id);
    Company findByUser();
    Company findByWaitListId(Long id);
    HttpStatus deleteCompanyById2(Long companyId);
    ArrayList<User> findAllUsersOfUserCompany();
    HttpStatus removeUserFromCompany(Long id);
}
