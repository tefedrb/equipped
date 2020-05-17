package com.usersapi.Service;

import com.usersapi.Model.User;
import com.usersapi.Model.UserRole;
import com.usersapi.Repository.UserRepository;
import com.usersapi.Repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Iterable<UserRole> listRoles() {
        return userRoleRepository.findAll();
    }

    @Override
    public UserRole createRole(UserRole newRole) {
        return userRoleRepository.save(newRole);
    }

    @Override
    public HttpStatus deleteRoleById(long id) {
        userRoleRepository.deleteById(id);
        return HttpStatus.OK;
    }

    @Override
    public UserRole getRole(String roleName){
        return userRoleRepository.findByRoleType(roleName);
    }

    @Override
    public HttpStatus updateUserRole(UserRole userRole) throws IllegalArgumentException{
        UserRole userrole = userRoleRepository.findByRoleType(userRole.getRoleType());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authorizedUser = userRepository.findByUsername(userName);

        authorizedUser.setUserRole(userrole);

        userRepository.save(authorizedUser);
        return HttpStatus.OK;
    }

    @Override
    public HttpStatus promoteToAdmin(Long userId) throws IllegalArgumentException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authorizedUser = userRepository.findByUsername(userName);
        User targetUser = userRepository.findById(userId).get();
        UserRole admin = userRoleRepository.findByRoleType("ADMIN");

        if(authorizedUser.getUserRole().getRoleType().equals("ADMIN")){
            targetUser.setUserRole(admin);
            userRepository.save(targetUser);
            return HttpStatus.OK;
        }
        return HttpStatus.FORBIDDEN;
    }
}
