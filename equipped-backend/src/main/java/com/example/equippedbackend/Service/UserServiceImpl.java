package com.example.equippedbackend.Service;

import com.example.equippedbackend.Model.User;
import com.example.equippedbackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

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
        userRepository.save(newUser);
        return HttpStatus.OK;
    }

    @Override
    public HttpStatus deleteUserById(long id) {
        userRepository.deleteById(id);
        return HttpStatus.OK;
    }
}
