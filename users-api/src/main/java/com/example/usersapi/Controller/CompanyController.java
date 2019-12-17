package com.example.usersapi.Controller;


import com.example.usersapi.JSONviews.CompanyViews;
import com.example.usersapi.JSONviews.WaitListViews;
import com.example.usersapi.Model.Company;
import com.example.usersapi.Model.User;
import com.example.usersapi.Model.WaitList;
import com.example.usersapi.Repository.CompanyRepository;
import com.example.usersapi.Repository.UserRepository;
import com.example.usersapi.Repository.WaitListRepository;
import com.example.usersapi.Service.CompanyService;
import com.example.usersapi.Service.WaitListService;
import com.fasterxml.jackson.annotation.JsonView;
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
    CompanyRepository companyRepository;

    @Autowired
    WaitListService waitListService;

    @Autowired
    WaitListRepository waitListRepository;

    @Autowired
    UserRepository userRepository;

    @RequestMapping("/test")
    public String test(){
        return "Testing...";
    }

    @GetMapping("/list")
    public Iterable<Company> getAllCompanies(){
        Iterable<Company> allCompanies = companyService.getAllCompanies();
//        for(Company c : allCompanies){
//            c.setUsers(null);
//    // c.setWaitList(null);
//        }
        return allCompanies;
    }

    @PostMapping("/create")
    public HttpStatus createCompany(@RequestBody Company company){
        return companyService.createCompany(company);
    }

    // Need to create a verifyUser method - @PathVariable for user-to-verify (needs to be on list)
    // Send in company object - add user to company

//     @PutMapping("/verify/{userId}")
//     public HttpStatus verifyUser(@PathVariable int userId, @RequestBody Company company){
//        return companyService.verifyUser(userId, company);
//     }
    @PostMapping("/addUser/{waitListId}/{userId}")
    public HttpStatus confirmAddUser(@PathVariable long waitListId, @PathVariable long userId){
        // Need to make sure the auth user is an admin of company via waitlistId
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authUser = userRepository.findByUsername(userName);

        WaitList targetWaitList = waitListRepository.findById(waitListId).get();
        Company targetCompany = companyRepository.findById(waitListId).get();
        // Get target user
        User targetUser = targetWaitList
                .getUsers()
                .stream()
                .filter(user -> user.getId().equals(userId))
                .reduce((a,b) -> b)
                .get();

        if(targetCompany.getUsers().contains(authUser) && authUser.getUserRole().equals("ADMIN")){
            // Add a "remove user to wait list" function to WaitListModel
            // Add user to company user list
        }
        return HttpStatus.OK;
    }
}
