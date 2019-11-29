package com.example.usersapi.Controller;

import com.example.usersapi.Model.User;
import com.example.usersapi.Model.UserRole;
import com.example.usersapi.Service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userRole")
public class UserRoleController {
   @Autowired
   UserRoleService userRoleService;

    @PostMapping("/create")
    public HttpStatus createRole(@RequestBody UserRole userRole) {
        userRoleService.createRole(userRole);
        return HttpStatus.OK;
    }

   @GetMapping("/listall")
       public Iterable<UserRole> listRoles(){
           Iterable<UserRole> userRoles = userRoleService.listRoles();
           /* Iterating over each instance of a userRole, then grabbing
             each associated user, and setting that role to null before
             returning to avoid Jackson recursion */
           for(UserRole r: userRoles){
               for(User u: r.getUser())
                   u.setUserRole(null);
           }
           return userRoles;
       }
}
