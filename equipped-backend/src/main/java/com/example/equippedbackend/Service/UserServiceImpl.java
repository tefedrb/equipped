package com.example.equippedbackend.Service;

import com.example.equippedbackend.Model.User;
import com.example.equippedbackend.Model.UserRole;
import com.example.equippedbackend.Repository.UserRepository;
import com.example.equippedbackend.Repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    UserRoleService userRoleService;
//    @Override
//    public User getUserByName(String name) {
//        return userRepository.findByUserName();
//    }

    @Override
    public Iterable<User> listUsers() {
        return userRepository.findAll();
    }

    @Override
    public HttpStatus createUser(User newUser) {
        UserRole userRole = userRoleService.getRole(newUser.getUserRole().getRoleType());
        newUser.setUserRole(userRole);
        userRepository.save(newUser);
        return HttpStatus.OK;
    }

    @Override
    public HttpStatus deleteUserById(long id) {
        userRepository.deleteById(id);
        return HttpStatus.OK;
    }
}
