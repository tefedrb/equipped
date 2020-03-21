package com.usersapi.Service;

import com.usersapi.Model.User;
import org.springframework.http.HttpStatus;

public interface WaitListService {
    public HttpStatus joinWaitList(long id, User user);
    public HttpStatus confirmUser(long waitListId, long userId);
}
