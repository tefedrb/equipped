package com.usersapi.Service;

import com.usersapi.Model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    public Iterable<User> listUsers();
    public String createUser(User newUser);
    public HttpStatus deleteUserById(long id);
    public User getUser(String username);
    public String login(User user);
    public ResponseEntity<?> updateUser(long id, User user);
}
