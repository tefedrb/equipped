package com.example.equippedbackend.Service;

import com.example.equippedbackend.Model.UserRole;
import com.example.equippedbackend.Repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserRoleServiceImpl implements UserRoleService{

    @Autowired
    UserRoleRepository userRoleRepository;

    @Override
    public Iterable<UserRole> listRoles() {
        return userRoleRepository.findAll();
    }

    @Override
    public HttpStatus createRole(UserRole newRole) {
        userRoleRepository.save(newRole);
        return HttpStatus.OK;
    }

    @Override
    public HttpStatus deleteRoleById(long id) {
        userRoleRepository.deleteById(id);
        return HttpStatus.OK;
    }
}
