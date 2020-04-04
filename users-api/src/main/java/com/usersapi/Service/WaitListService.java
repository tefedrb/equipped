package com.usersapi.Service;

import com.usersapi.Model.User;
import org.springframework.http.HttpStatus;

public interface WaitListService {
    HttpStatus joinWaitList(long id, User user);
    HttpStatus confirmUser(long waitListId, long userId);
}
