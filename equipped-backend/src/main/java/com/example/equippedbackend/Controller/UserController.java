package com.example.equippedbackend.Controller;

import com.example.equippedbackend.Model.User;
import com.example.equippedbackend.Repository.UserRepository;
import com.example.equippedbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/signup")
    public String createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/listall")
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
}
