package com.usersapi.Service;

import com.usersapi.Model.User;
import com.usersapi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthorizedUserImpl implements AuthorizedUser {

    @Autowired
    UserRepository userRepository;

    @Override
    public Authentication getUserAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public String getUserName() throws Exception {
        return getUserAuthentication().getName();
    }

    @Override
    public User getUser() throws Exception {
        return userRepository.findByUsername(this.getUserAuthentication().getName());
    }
}

