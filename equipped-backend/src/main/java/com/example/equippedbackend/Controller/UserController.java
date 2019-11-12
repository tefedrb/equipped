package com.example.equippedbackend.Controller;

import com.example.equippedbackend.Model.User;
import com.example.equippedbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/create")
    public HttpStatus createRole(User user) {
        userService.createUser(user);
        return HttpStatus.OK;
    }

}
