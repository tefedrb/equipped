package com.usersapi.Service;

import com.usersapi.Model.Company;
import com.usersapi.Model.User;
import com.usersapi.Model.WaitList;
import com.usersapi.Repository.CompanyRepository;
import com.usersapi.Repository.UserRepository;
import inventoryManagement.CreateInventory;
import inventoryManagement.InventoryObj;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.ConnectException;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    @Qualifier("encoder")
    PasswordEncoder bCryptPasswordEncoder;

    @Override
    public HttpStatus createCompany(Company newCompany) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authUser = userRepository.findByUsername(userName);

        // Create a wait list as soon as a new company is created
        WaitList newWaitList = new WaitList();
        newCompany.addUsers(authUser);
        authUser.setCompany(newCompany);
        newCompany.setWaitList(newWaitList);
        newWaitList.setCompany(newCompany);
        // Encrypting company password
        newCompany.setPassword(bCryptPasswordEncoder.encode(newCompany.getPassword()));

        // Call inventory service
        CreateInventory createInventory = new CreateInventory();

        companyRepository.save(newCompany);

        // Company id gets generated after it's saved to repository - find/save it...
        Long companyId = companyRepository.findCompanyByName(newCompany.getName()).getId();

        // Build inventoryObj to send into createInventories Http post method (run())
        InventoryObj inventoryObj = new InventoryObj(newCompany.getName(), companyId);
        createInventory.run(inventoryObj);

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
//    @Override
//    public HttpStatus verifyUser(Integer userId, Company company){
//        // Get authorization (from alleged admin)
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userName = authentication.getName();
//        User authUser = userRepository.findByUsername(userName);
//        // Check userRole if admin continue, otherwise return bad request
//        if(authUser.getUserRole().equals("ADMIN")){
//            // Find user from company waitList (trying from repository first)
//            User targetUser = userRepository.findById(userId);
//            // Add user to company
//            company.addUsers(targetUser);
//            company.getWaitList().remove(targetUser);
//            return HttpStatus.OK;
//        }
//        return HttpStatus.FORBIDDEN;
//    }

//    @Override
//    public HttpStatus findCompany(Long id){
//        Company targetCompany = companyRepository.findById(id).get();
//
//    }

    @Override
    public Company findByUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authUser = userRepository.findByUsername(userName);
        long userCompanyId = authUser.getCompany().getId();
        System.out.println(userCompanyId + " <-- HERE IS THE COMPANY ID!!!!!");
        return companyRepository.findById(userCompanyId).get();
    }
}