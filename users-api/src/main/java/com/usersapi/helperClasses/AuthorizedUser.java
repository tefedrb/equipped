package com.usersapi.helperClasses;

import com.usersapi.Model.User;
import com.usersapi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthorizedUser {

    @Autowired
    UserRepository userRepository;

    private Authentication getUserAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public String getUserName() throws Exception {
        return getUserAuthentication().getName();
    }

    public User getUser() throws Exception {
        return userRepository.findByUsername(this.getUserAuthentication().getName());
    }
}
