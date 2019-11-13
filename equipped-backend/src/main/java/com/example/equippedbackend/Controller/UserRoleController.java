package com.example.equippedbackend.Controller;

import com.example.equippedbackend.Model.UserRole;
import com.example.equippedbackend.Service.UserRoleService;
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
           return userRoleService.listRoles();
       }
}
