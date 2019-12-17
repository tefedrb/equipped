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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Override
    public HttpStatus confirmUser(long waitListId, long userId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authUser = userRepository.findByUsername(userName);

        WaitList targetWaitList = waitListRepository.findById(waitListId).get();
        Company targetCompany = companyRepository.findById(waitListId).get();
        // Get target user
        User targetUser = targetWaitList
                .getUsers()
                .stream()
                .filter(user -> user.getId().equals(userId))
                .reduce((a,b) -> b)
                .get();

        if(targetCompany.getUsers().contains(authUser) && authUser.getUserRole().equals("ADMIN")){
            // Add a "remove user to wait list" function to WaitListModel
            targetWaitList.removeUser(targetUser);
            // Add user to company user list
            targetCompany.addUsers(targetUser);
            companyRepository.save(targetCompany);
            return HttpStatus.OK;
        }
        return HttpStatus.FORBIDDEN;
    }
}
