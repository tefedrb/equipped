package com.usersapi.Service;

import com.usersapi.Model.UserRole;
import org.springframework.http.HttpStatus;

public interface UserRoleService {
    Iterable<UserRole> listRoles();
    UserRole createRole(UserRole newRole);
    HttpStatus deleteRoleById(long id);
    UserRole getRole(String roleName);
    HttpStatus updateUserRole(UserRole userrole);
    HttpStatus promoteToAdmin(Long userId);
}
