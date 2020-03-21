package com.usersapi.Controller;

import com.usersapi.Model.Company;
import com.usersapi.Model.WaitList;
import com.usersapi.Repository.CompanyRepository;
import com.usersapi.Repository.WaitListRepository;
import com.usersapi.Service.WaitListService;
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
    public HttpStatus confirmUser(@PathVariable long waitListId, @PathVariable long userId){
        return waitlistService.confirmUser(waitListId, userId);
    }
}
