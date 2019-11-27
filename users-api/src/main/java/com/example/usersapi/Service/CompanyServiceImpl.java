package com.example.usersapi.Service;

import com.example.usersapi.Model.Company;
import com.example.usersapi.Model.User;
import com.example.usersapi.Repository.CompanyRepository;
import com.example.usersapi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Override
    public HttpStatus createCompany(Company newCompany) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
//        System.out.println(userName);
        User authUser = userRepository.findByUsername(userName);
        // So the whole point of getting the userName of the user creating the company
        // is to get the user attached to the newCompany request
//        User user = userService.getUser(newCompany.getUsers().get());
        newCompany.addUsers(authUser);
        authUser.setCompany(newCompany);
        companyRepository.save(newCompany);

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus deleteCompanyById(long companyId) {
        companyRepository.deleteById(companyId);
        return HttpStatus.OK;
    }

    @Override
    public HttpStatus updateCompany(long id, Company companyReq){
        Company company = companyRepository.findById(id).get();
        company.setName(companyReq.getName());
        company.setType(companyReq.getName());
        companyRepository.save(company);
        return HttpStatus.OK;
    }

    // Set up query in repository
    @Override
    public Iterable<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

//    @Override
//    public Iterable<Company> findCompanyByPerson(long id) {
//        return null;
//    }
    @Override
    public HttpStatus verifyUser(Integer userId, Company company){
        // Get authorization (from alleged admin)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authUser = userRepository.findByUsername(userName);
        // Check userRole if admin continue, otherwise return bad request
        if(authUser.getUserRole().equals("ADMIN")){
            // Find user from company waitList (trying from repository first)
            User targetUser = userRepository.findById(userId);
            // Add user to company
            company.addUsers(targetUser);
            company.getWaitList().remove(targetUser);
            return HttpStatus.OK;
        }
        return HttpStatus.FORBIDDEN;
    }
}
