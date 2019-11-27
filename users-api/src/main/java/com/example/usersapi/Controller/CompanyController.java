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
        return companyService.createCompany(company);
    }

    // Need to create a verifyUser method - @PathVariable for user-to-verify (needs to be on list)
    // Send in company object - add user to company

     @PutMapping("/verify/{userId}")
     public HttpStatus verifyUser(@PathVariable int userId, @RequestBody Company company){
        return companyService.verifyUser(userId, company);
     }
}
