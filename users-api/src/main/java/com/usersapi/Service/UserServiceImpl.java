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
        userRepository.save(newUser);
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
        System.out.println("IN USERDETAILS !!!!!");
        System.out.println(user.getUsername() + " <USER NAME HERE!!!!!");
        if(user==null)
            throw new UsernameNotFoundException("User null");
        System.out.println("IN USERDETAILS PAST NULL CHECK...");
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
        System.out.println("IN GET GRANTED AUTHORITIES");
        authorities.add( new SimpleGrantedAuthority(user.getUserRole().getRoleType()));
        return authorities;
    }

    @Override
    public ResponseEntity<User> updateUser(long id, User userReq){
        if(userRepository.findById(id).isPresent()) {
            User user = userRepository.findById(id).get();
            user.setTitle(userReq.getTitle());
            user.setCompany(userReq.getCompany());
            user.setUsername(userReq.getUsername());
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
        return null;
    }

}
