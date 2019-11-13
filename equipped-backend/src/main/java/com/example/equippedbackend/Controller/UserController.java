package com.example.equippedbackend.Controller;

import com.example.equippedbackend.Model.User;
import com.example.equippedbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public String createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/listall")
    public Iterable<User> listUsers(){
       return userService.listUsers();
    }

}
