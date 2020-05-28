package com.usersapi.Service;

import com.usersapi.Model.User;
import org.springframework.security.core.Authentication;

public interface AuthorizedUser {
    Authentication getUserAuthentication() ;
    String getUserName() throws Exception;
    User getUser() throws Exception;
}
