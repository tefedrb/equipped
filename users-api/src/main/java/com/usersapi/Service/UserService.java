package com.usersapi.Service;

import com.usersapi.Model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    Iterable<User> listUsers();
    String createUser(User newUser);
    HttpStatus deleteUserById(long id);
    User getUser(String username);
    String login(User user);
    ResponseEntity<?> updateUser(long id, User user);
}
