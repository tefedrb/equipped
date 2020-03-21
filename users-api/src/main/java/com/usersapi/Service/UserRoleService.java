package com.usersapi.Service;

import com.usersapi.Model.UserRole;
import org.springframework.http.HttpStatus;

public interface UserRoleService {
    public Iterable<UserRole> listRoles();
    public UserRole createRole(UserRole newRole);
    public HttpStatus deleteRoleById(long id);
    public UserRole getRole(String roleName);
}
