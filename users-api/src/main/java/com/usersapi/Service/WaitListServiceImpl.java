package com.usersapi.Service;

import com.usersapi.Model.Company;
import com.usersapi.Model.User;
import com.usersapi.Model.WaitList;
import com.usersapi.Repository.CompanyRepository;
import com.usersapi.Repository.UserRepository;
import com.usersapi.Repository.WaitListRepository;
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
    public HttpStatus joinWaitList(Long id, User user){
        try {
            WaitList targetList = waitListRepository.findById(id).get();
            targetList.addUsers(user);
            user.setWaitList(targetList);
            userRepository.save(user);
            waitListRepository.save(targetList);
            return HttpStatus.OK;
        } catch (Exception e){
            System.err.println(e.getMessage());
            return HttpStatus.FORBIDDEN;
        }
    }

    @Override
    public HttpStatus confirmUser(Long waitListId, Long userId){
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

        if(targetCompany.getUsers().contains(authUser) && authUser.getUserRole().getRoleType().equals("ADMIN")){
            // Add a "remove user to wait list" function to WaitListModel
            targetWaitList.removeUser(targetUser);
            // Add user to company user list
            targetCompany.addUsers(targetUser);
            companyRepository.save(targetCompany);
            waitListRepository.save(targetWaitList);
            return HttpStatus.OK;
        }
        return HttpStatus.FORBIDDEN;
    }
}
