package com.example.equippedbackend.Controller;


import com.example.equippedbackend.Model.Company;
import com.example.equippedbackend.Service.CompanyService;
import com.example.equippedbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @GetMapping("/list")
    public Iterable<Company> getAllCompanies(){
        return companyService.getAllCompanies();
    }
}
