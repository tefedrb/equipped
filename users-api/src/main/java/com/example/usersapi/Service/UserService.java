package com.example.usersapi.Service;

import com.example.usersapi.Model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
//    public User getUserByName(String name);
    public Iterable<User> listUsers();
    public String createUser(User newUser);
//    public String login(User user);
    public HttpStatus deleteUserById(long id);
    public User getUser(String username);
    public String login(User user);
    public ResponseEntity<?> updateUser(long id, User user);

    // I'm working on creating a patch request that takes an object and iterates through
    // it and patches just the new information
//    public User returnUser(long id, Object requestObj);
}
