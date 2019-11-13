package com.example.equippedbackend.Controller;

import com.example.equippedbackend.Model.User;
import com.example.equippedbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/create")
    public HttpStatus createUser(@RequestBody User user) {
        userService.createUser(user);
        return HttpStatus.OK;
    }

    @GetMapping("/listall")
    public Iterable<User> listUsers(){
       return userService.listUsers();
    }

}
