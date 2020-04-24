package com.usersapi.Service;

import com.usersapi.Config.JwtUtil;
import com.usersapi.Model.User;
import com.usersapi.Model.UserRole;
import com.usersapi.Repository.CompanyRepository;
import com.usersapi.Repository.UserRepository;
import com.usersapi.Repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    UserRoleService userRoleService;

    @Autowired
    JwtUtil jwtutil;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    @Qualifier("encoder")
    PasswordEncoder bCryptPasswordEncoder;

    @Override
    public Iterable<User> listUsers() {
        return userRepository.findAll();
    }

    @Override
    public String createUser(User newUser) {
        UserRole userRole = userRoleService.getRole(newUser.getUserRole().getRoleType());
        newUser.setUserRole(userRole);
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        try{
            UserDetails userDetails = loadUserByUsername(newUser.getUsername());
            return jwtutil.generateToken(userDetails);
        } catch (IllegalArgumentException e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public HttpStatus deleteUserById(long id) {
        userRepository.deleteById(id);
        return HttpStatus.OK;
    }

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUser(username);
        if(user==null)
            throw new UsernameNotFoundException("User null");
        return new org.springframework.security.core.userdetails.User(user.getUsername(), bCryptPasswordEncoder.encode(user.getPassword()),
                true, true, true, true, getGrantedAuthorities(user));
    }

    @Override
    public String login(User user){
        User returnUser = userRepository.findByUsername(user.getUsername());
        if(returnUser != null && bCryptPasswordEncoder.matches(user.getPassword(), returnUser.getPassword())){
            UserDetails userDetails = loadUserByUsername(returnUser.getUsername());
            return jwtutil.generateToken(userDetails);
        }
        return null;
    }

    private List<GrantedAuthority> getGrantedAuthorities(User user){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add( new SimpleGrantedAuthority(user.getUserRole().getRoleType()));
        return authorities;
    }

    @Override
    public ResponseEntity<?> updateUser(long id, User userReq){
            User user = userRepository.findById(id).get();
            user.setTitle(userReq.getTitle());
            user.setCompany(userReq.getCompany());
            user.setUsername(userReq.getUsername());
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        return ResponseEntity.ok("updated");
    }

//    @Override
//    public User returnUser(long id, Object reqObj){
//        User user = userRepository.findById(id).get();
//        if(reqObj)
//    }

//    @Override
//    public HttpStatus joinCompany(Long id, String password){
//        // Checking for user authentication
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        // Getting the username associated with the jwt
//        String userName = authentication.getName();
//        //  Find user by username
//        // I might need to recreate the company before I save it?
//        User authUser = userRepository.findByUsername(userName);
//
//        Company targetCompany = companyRepository.findById(id).get();
//
//        if(password.equals(targetCompany.getPassword())){
//            targetCompany.addToWaitList(authUser);
//            companyRepository.save(targetCompany);
//            return HttpStatus.OK;
//        }
//        return HttpStatus.NOT_ACCEPTABLE;
//    }
}
