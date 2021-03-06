package com.usersapi.Controller;

import com.usersapi.Model.Company;
import com.usersapi.Model.User;
import com.usersapi.Repository.CompanyRepository;
import com.usersapi.Repository.UserRepository;
import com.usersapi.Service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

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

    @GetMapping("/zuul-test")
    public String zuulTest() { return "Test 2..."; }

    @GetMapping("/list")
    public Iterable<Company> getAllCompanies(){
         return companyService.getAllCompanies();
    }

    @PostMapping("/create")
    public HttpStatus createCompany(@RequestBody Company company){
        return companyService.createCompany(company);
    }

    @GetMapping("/user-company")
    public Company getUserCompany(){
        try {
            return companyService.findByUser();
        } catch (NullPointerException e){
            Company dummyComp = new Company();
            dummyComp.setName(null);
            return dummyComp;
        }
    }

    @GetMapping("/by-wait-list/{waitListId}")
    public Company getByWaitListId(@PathVariable Long waitListId){
        return companyService.findByWaitListId(waitListId);
    }

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteCompanyById(@PathVariable Long id){
        return companyService.deleteCompanyById2(id);
    }


    @GetMapping("/{company_id}")
    public Company getCompanyById(@PathVariable Long company_id){
        return companyService.getCompanyById(company_id);
    }

    @GetMapping("/list-users")
    public ArrayList<User> getCompanyUsersByUser(){
        return companyService.findAllUsersOfUserCompany();
    }

    @PutMapping("/remove-user/{user_id}")
    public HttpStatus removeUserFromCompany(@PathVariable Long user_id){
        return companyService.removeUserFromCompany(user_id);
    }
}
