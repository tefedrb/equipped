package com.example.equippedbackend.Service;

import com.example.equippedbackend.Model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
//    public User getUserByName(String name);
    public Iterable<User> listUsers();
    public String createUser(User newUser);
//    public String login(User user);
    public HttpStatus deleteUserById(long id);
    public User getUser(String username);
    public String login(User user);
}
