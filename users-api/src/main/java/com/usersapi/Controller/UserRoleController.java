package com.usersapi.Controller;

import com.usersapi.Model.UserRole;
import com.usersapi.Service.UserRoleService;
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
       return userRoles;
   }
}
