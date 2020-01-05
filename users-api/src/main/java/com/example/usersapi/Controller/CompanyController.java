package com.example.usersapi.Controller;

import com.example.usersapi.Model.Company;
import com.example.usersapi.Model.User;
import com.example.usersapi.Repository.CompanyRepository;
import com.example.usersapi.Repository.UserRepository;
import com.example.usersapi.Repository.WaitListRepository;
import com.example.usersapi.Service.CompanyService;
import com.example.usersapi.Service.WaitListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
       return companyService.findByUser();
    }
}
