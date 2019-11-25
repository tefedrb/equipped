package com.example.usersapi.Service;

import com.example.usersapi.Model.Company;
import com.example.usersapi.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    CompanyRepository companyRepository;

    @Override
    public HttpStatus createCompany(Company newCompany) {
        companyRepository.save(newCompany);
        return HttpStatus.OK;
    }

    @Override
    public HttpStatus deleteCompanyById(long companyId) {
        companyRepository.deleteById(companyId);
        return HttpStatus.OK;
    }

    @Override
    public HttpStatus updateCompany(long id, Company companyReq){
        Company company = companyRepository.findById(id).get();
        company.setName(companyReq.getName());
        company.setType(companyReq.getName());

        companyRepository.save(company);
        return HttpStatus.OK;
    }

    // Set up query in repository
    @Override
    public Iterable<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

//    @Override
//    public Iterable<Company> findCompanyByPerson(long id) {
//        return null;
//    }
}
