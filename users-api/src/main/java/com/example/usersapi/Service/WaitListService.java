package com.example.usersapi.Service;

import com.example.usersapi.Model.User;
import org.springframework.http.HttpStatus;

public interface WaitListService {
    public HttpStatus joinWaitList(long id, User user);
}
