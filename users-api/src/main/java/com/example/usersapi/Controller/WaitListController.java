package com.example.usersapi.Controller;

import com.example.usersapi.Model.Company;
import com.example.usersapi.Model.WaitList;
import com.example.usersapi.Repository.CompanyRepository;
import com.example.usersapi.Repository.WaitListRepository;
import com.example.usersapi.Service.WaitListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/waitlist")
public class WaitListController {

    @Autowired
    WaitListService waitlistService;

    @Autowired
    WaitListRepository waitListRepository;

    @Autowired
    CompanyRepository companyRepository;

     // Need to add admin privileges
    @GetMapping("/list/{companyId}")
    public WaitList getCompanyWaitList(@PathVariable long companyId){
        // Get company
        Company targetCompany = companyRepository.findById(companyId).get();
        // Get waitList id from company
        Long targetListId = targetCompany.getWaitList().getId();
        // Search WaitList repo
        return waitListRepository.findById(targetListId).get();
    }

    @GetMapping("/list")
    public Iterable<WaitList> getAllWaitLists(){
        return waitListRepository.findAll();
    }

    @PutMapping("/verify/{waitListId}/{userId}")
    public HttpStatus confirmAddUser(@PathVariable long waitListId, @PathVariable long userId){
        // Need to make sure the auth user is an admin of company via waitlistId
        return waitlistService.confirmUser(waitListId, userId);
    }
}
