package com.example.usersapi.Service;

import com.example.usersapi.Model.UserRole;
import com.example.usersapi.Repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserRoleServiceImpl implements com.example.usersapi.Service.UserRoleService {

    @Autowired
    UserRoleRepository userRoleRepository;

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
}
