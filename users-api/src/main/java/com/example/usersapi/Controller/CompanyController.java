package com.example.usersapi.Controller;


import com.example.usersapi.Model.Company;
import com.example.usersapi.Model.User;
import com.example.usersapi.Service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @RequestMapping("/test")
    public String test(){
        return "Testing...";
    }

    @GetMapping("/list")
    public Iterable<Company> getAllCompanies(){
        return companyService.getAllCompanies();
    }

    @PostMapping("/create")
    public HttpStatus createCompany(@RequestBody Company company){
        System.out.println("here");
        companyService.createCompany(company);
        return HttpStatus.OK;
    }
    // Need a create company method
//    @PutMapping("/add")
//    public HttpStatus addCompany(Company company){
//        // Get user
//
//        // Add Company to user
//    }
}
