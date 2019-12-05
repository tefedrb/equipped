package com.example.usersapi.Controller;

import com.example.usersapi.Service.WaitListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/waitlist")
public class WaitListController {

    @Autowired
    WaitListService waitlistService;

    // Need to add admin privileges
//    @GetMapping("/list/{companyId}")
//    public Iterable<WaitList> getCompanyWaitlist(){
//
//    }

}
