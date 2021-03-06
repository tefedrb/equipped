package com.usersapi.Service;

import com.usersapi.Model.User;
import com.usersapi.Model.WaitList;
import org.springframework.http.HttpStatus;

public interface WaitListService {
    HttpStatus joinWaitList(Long id, User user);
    HttpStatus confirmUser(Long waitListId, Long userId);
    User adminRetrieveUserOnWaitList(String username);
    WaitList getCompanyWaitList(Long company_id);
    HttpStatus removeUserFromWaitList(Long id);
}
