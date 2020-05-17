package com.usersapi.Controller;

import com.usersapi.Model.UserRole;
import com.usersapi.Service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-role")
public class UserRoleController {

   @Autowired
   UserRoleService userRoleService;

    @PostMapping("/create")
    public HttpStatus createRole(@RequestBody UserRole userRole) {
        userRoleService.createRole(userRole);
        return HttpStatus.OK;
    }

   @GetMapping("/listAll")
   public Iterable<UserRole> listRoles(){
       return userRoleService.listRoles();
   }

   @PutMapping("/update")
    public HttpStatus updateRole(@RequestBody UserRole userRole){
        return userRoleService.updateUserRole(userRole);
   }

   @PutMapping("/create-admin/{userId}")
    public HttpStatus promoteUserToAdminById(@PathVariable Long userId){
        return userRoleService.promoteToAdmin(userId);
   }
}
