package com.usersapi.Controller;

import com.usersapi.Config.JwtUtil;
import com.usersapi.JSONviews.JwtView;
import com.usersapi.Model.JwtResponse;
import com.usersapi.Model.User;
import com.usersapi.Repository.CompanyRepository;
import com.usersapi.Repository.UserRepository;
import com.usersapi.Service.CompanyService;
import com.usersapi.Service.UserService;
import com.usersapi.Service.WaitListService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CompanyService companyService;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    WaitListService waitListService;

    @Autowired
    JwtUtil jwtUtil;

    @GetMapping("/test")
    public String returnTest(){
        return "Testing userController";
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        return ResponseEntity.ok(new JwtResponse(userService.createUser(newUser)));
    }

    @PostMapping("/check-jwt")
    public JwtView checkJWTExpiration(@RequestBody JwtView jwtObj) {
        JwtView response = new JwtView();
        // Set jwt from RequestBody
        String jwt = jwtObj.getJwt();
        response.setJwt(jwt);
        // Check if expired, if not set date provided by jwtUtil...
        try {
            if(!jwtUtil.isTokenExpired(jwt)){
                response.setDate(jwtUtil.getExpirationDateFromToken(jwt));
            }
        } catch (ExpiredJwtException e){
            response.setValid(false);
            System.out.println(e.getMessage());
        }
        return response;
    }

    @GetMapping("/zuul-test3")
    public String zuulTest3() {return "Test 3...";}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        return ResponseEntity.ok(new JwtResponse(userService.login(user)));
    }

    @GetMapping("/list-all")
    public Iterable<User> listUsers(){
//        for(User u: allUsers){
//              u.getUserRole().setUsers(null);
//              u.getCompany().setUsers(null);
//              u.getCompany().setWaitList(null);
//        }
        return userService.listUsers();
    }

    @DeleteMapping("/{userId}")
    public HttpStatus deleteUserById(@PathVariable Long userId){
        return userService.deleteUserById(userId);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody User userReq){
        return userService.updateUser(userId, userReq);
    }


    @GetMapping("/retrieve")
    public User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return userRepository.findByUsername(userName);
    }
}
