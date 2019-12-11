package com.example.usersapi.Service;

import com.example.usersapi.Model.Company;
import com.example.usersapi.Model.User;
import com.example.usersapi.Model.WaitList;
import com.example.usersapi.Repository.CompanyRepository;
import com.example.usersapi.Repository.UserRepository;
import com.example.usersapi.Repository.WaitListRepository;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class WaitListServiceImpl implements WaitListService {

    @Autowired
    WaitListRepository waitListRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public HttpStatus joinWaitList(long id, User user){
        WaitList targetList = waitListRepository.findById(id).get();
        targetList.addUsers(user);
        user.setWaitList(targetList);
        userRepository.save(user);
        waitListRepository.save(targetList);
        return HttpStatus.OK;
    }
}
