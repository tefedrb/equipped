package com.example.usersapi.Controller;

import com.example.usersapi.Model.Waitlist;
import com.example.usersapi.Service.WaitlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/waitlist")
public class WaitlistController {

    @Autowired
    WaitlistService waitlistService;

    // Need to add admin privileges
//    @GetMapping("/list/{companyId}")
//    public Iterable<Waitlist> getCompanyWaitlist(){
//
//    }

}
