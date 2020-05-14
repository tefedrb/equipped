package com.usersapi.Service;

import com.usersapi.Model.Company;
import com.usersapi.inventoryManagement.InventoryObj;
import com.usersapi.Model.User;
import com.usersapi.Model.WaitList;
import com.usersapi.Repository.CompanyRepository;
import com.usersapi.Repository.UserRepository;
import com.usersapi.inventoryManagement.InventoryServiceFeign;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    InventoryServiceFeign inventoryServiceFeign;

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
        newWaitList.setCompanyName(newCompany.getName());
        newCompany.addUsers(authUser);
        authUser.setCompany(newCompany);
        newCompany.setWaitList(newWaitList);
        newWaitList.setCompany(newCompany);
        // Encrypting company password
        newCompany.setPassword(bCryptPasswordEncoder.encode(newCompany.getPassword()));

        // Save company instance to generate id
        companyRepository.save(newCompany);

        // Find company instance
        Long companyId = companyRepository.findCompanyByName(newCompany.getName()).getId();

        // Use Feign to call our inventory-api and create a new inventory
        inventoryServiceFeign.createInventory(new InventoryObj(newCompany.getName(), companyId));

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus deleteCompanyById(Long companyId) {
        companyRepository.deleteById(companyId);
        return HttpStatus.OK;
    }

    @Override
    public HttpStatus deleteCompanyById2(Long companyId){
        try {
            Company selectedCompany = companyRepository.findById(companyId).get();
            List<User> allUsers = selectedCompany.getUsers();
            for (User user : allUsers) {
                user.setCompany(null);
                userRepository.save(user);
            }
            selectedCompany.setUsers(null);
            companyRepository.save(selectedCompany);
            companyRepository.deleteById(companyId);
            return HttpStatus.OK;
        } catch (Exception e){
            System.err.println("Error in deleteCompanyById2: " + e.getMessage());
        }
        return HttpStatus.FORBIDDEN;
    }

    @Override
    public HttpStatus updateCompany(Long id, Company companyReq){
        Company company = companyRepository.findById(id).get();
        company.setName(companyReq.getName());
        company.setType(companyReq.getName());
        companyRepository.save(company);
        return HttpStatus.OK;
    }

    @Override
    public Iterable<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Company getCompanyById(Long id){
        try {
            Company targetCompany = companyRepository.findById(id).get();
            targetCompany.setPassword(null);
            targetCompany.setUsers(null);
            return targetCompany;
        } catch (Exception e){
            System.err.println("Error in getCompanyById (company service): " + e.getMessage());
            return null;
        }
    }

    @Override
    public Company findByUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authUser = userRepository.findByUsername(userName);
        long userCompanyId = authUser.getCompany().getId();
        System.out.println(userCompanyId + " <-- HERE IS THE COMPANY ID!!!!!");
        return companyRepository.findById(userCompanyId).get();
    }

    @Override
    public Company findByWaitListId(Long id){
        Company company = companyRepository.findCompanyByWaitListId(id);
        company.setUsers(null);
        company.setPassword(null);
        return company;
    }

    @Override
    public ArrayList<String[]> findAllUsersOfUserCompany() throws IllegalArgumentException{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authorizedUser = userRepository.findByUsername(userName);
        Company userCompany = authorizedUser.getCompany();
//        Company userCompany = companyRepository.findById(companyId).get();
        ArrayList<String[]> users = new ArrayList<>();
        userCompany.getUsers().forEach(user -> users.add(new String[] {user.getUsername(), user.getTitle()}));
        return users;
    }
}
