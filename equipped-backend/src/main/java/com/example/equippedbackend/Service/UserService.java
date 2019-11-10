package com.example.equippedbackend.Service;

import com.example.equippedbackend.Model.User;
import org.springframework.http.HttpStatus;

public interface UserService {
//    public User getUserByName(String name);
    public Iterable<User> listUsers();
    public HttpStatus createUser(User newUser);
//    public String login(User user);
    public HttpStatus deleteUserById(long id);
}
