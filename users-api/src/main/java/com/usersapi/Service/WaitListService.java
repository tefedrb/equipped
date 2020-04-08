package com.usersapi.Service;

import com.usersapi.Model.User;
import org.springframework.http.HttpStatus;

public interface WaitListService {
    HttpStatus joinWaitList(Long id, User user);
    HttpStatus confirmUser(Long waitListId, Long userId);
}
