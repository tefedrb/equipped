package com.example.usersapi.Controller;

import com.example.usersapi.Model.Company;
import com.example.usersapi.Model.JwtResponse;
import com.example.usersapi.Model.User;
import com.example.usersapi.Repository.CompanyRepository;
import com.example.usersapi.Repository.UserRepository;
import com.example.usersapi.Service.CompanyService;
import com.example.usersapi.Service.UserService;
import com.example.usersapi.Service.WaitListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CompanyService companyService;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    WaitListService waitListService;

    @PostMapping("/signup")
    public ResponseEntity createUser(@RequestBody User user) {
        return ResponseEntity.ok(new JwtResponse(userService.createUser(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        return ResponseEntity.ok(new JwtResponse(userService.login(user)));
    }
    
    @GetMapping("/user/listall")
    public Iterable<User> listUsers(){
        Iterable<User> allUsers = userService.listUsers();
//        for(User u: allUsers){
//              u.getUserRole().setUsers(null);
//              u.getCompany().setUsers(null);
//              u.getCompany().setWaitList(null);
//        }
       return allUsers;
    }

    @DeleteMapping("/user/{userId}")
    public HttpStatus deleteUserById(@PathVariable long userId){
        return userService.deleteUserById(userId);
    }

    @PutMapping("/user/update/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable long userId, @RequestBody User userReq){
        return userService.updateUser(userId, userReq);
    }

//    @PutMapping("/user/joinCompany/{companyId}")
//    public HttpStatus joinCompany(@PathVariable Long companyId, @RequestBody String password){
////        JSONObject passwordObj = new JSONObject(password);
//        companyRepository.findById(companyId);
//        return userService.joinCompany(companyId, password);
//    }

    @PutMapping("/add/{waitListId}")
    public HttpStatus joinWaitList(@PathVariable long waitListId){
        // Get auth user and add
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authUser = userRepository.findByUsername(userName);
        // if user exists in company user list dont add to wait list
        Company companyOfWaitList = companyRepository.findById(waitListId).get();
        if(companyOfWaitList.getUsers().contains(authUser)){
            return HttpStatus.FORBIDDEN;
        }
        return waitListService.joinWaitList(waitListId, authUser);
    }
}
