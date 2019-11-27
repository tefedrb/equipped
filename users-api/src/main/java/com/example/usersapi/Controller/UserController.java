package com.example.usersapi.Controller;

import com.example.usersapi.Model.Company;
import com.example.usersapi.Model.JwtResponse;
import com.example.usersapi.Model.User;
import com.example.usersapi.Repository.UserRepository;
import com.example.usersapi.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

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
       return userService.listUsers();
    }

    @DeleteMapping("/user/{userId}")
    public HttpStatus deleteUserById(@PathVariable long userId){
        return userService.deleteUserById(userId);
    }

    @PutMapping("/user/update/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable long userId, @RequestBody User userReq){
        return userService.updateUser(userId, userReq);
    }

    @PutMapping("/user/joinCompany/{companyId}")
    public HttpStatus joinCompany(@PathVariable String companyName, String password){
        return userService.joinCompany(companyName, password);
    }
}
