package com.example.usersapi.Controller;

import com.example.usersapi.Model.Company;
import com.example.usersapi.Repository.CompanyRepository;
import com.example.usersapi.Repository.UserRepository;
import com.example.usersapi.Service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CompanyRepository companyRepository;

    @RequestMapping("/test")
    public String test(){
        return "Testing...";
    }

    @GetMapping("/list")
    public Iterable<Company> getAllCompanies(){
        Iterable<Company> allCompanies = companyService.getAllCompanies();
        return allCompanies;
    }

    @PostMapping("/create")
    public HttpStatus createCompany(@RequestBody Company company){
        return companyService.createCompany(company);
    }

    @GetMapping("/userCompany")
    public Company getUserCompany(){
        try {
            Company userComp = companyService.findByUser();
            return userComp;
        } catch (NullPointerException e){
            Company dummyComp = new Company();
            dummyComp.setName("Null");
            return dummyComp;
        }
    }
}
