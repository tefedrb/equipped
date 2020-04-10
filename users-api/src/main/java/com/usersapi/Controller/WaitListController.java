package com.usersapi.Controller;

import com.usersapi.Model.Company;
import com.usersapi.Model.User;
import com.usersapi.Model.WaitList;
import com.usersapi.Repository.CompanyRepository;
import com.usersapi.Repository.UserRepository;
import com.usersapi.Repository.WaitListRepository;
import com.usersapi.Service.WaitListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wait-list")
public class WaitListController {

    @Autowired
    WaitListService waitListService;

    @Autowired
    WaitListRepository waitListRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    UserRepository userRepository;

     // Need to add admin privileges
    @GetMapping("/{companyId}")
    public WaitList getCompanyWaitList(@PathVariable Long companyId){
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
    public HttpStatus confirmUser(@PathVariable Long waitListId, @PathVariable Long userId){
        return waitListService.confirmUser(waitListId, userId);
    }

    @PutMapping("/join/{company_id}")
    public HttpStatus joinWaitList(@PathVariable Long company_id){
        // Get auth user and add
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authUser = userRepository.findByUsername(userName);
        Company companyOfWaitList = companyRepository.findById(company_id).get();
        Long waitListId = companyOfWaitList.getWaitList().getId();
        // if user exists in company user list dont add to wait list
        if(companyOfWaitList.getUsers().contains(authUser)){
            return HttpStatus.FORBIDDEN;
        }
        return waitListService.joinWaitList(waitListId, authUser);
    }

    @GetMapping("/by-user")
    public WaitList getByUserName(){
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();
        String userName = authentication.getName();
        try {
            return waitListRepository.findWaitListByUserName(userName);
        } catch (Exception e){
            System.err.println(e.getMessage());
        }
        return null;
    }
}
