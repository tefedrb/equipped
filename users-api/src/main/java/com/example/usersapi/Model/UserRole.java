package com.example.usersapi.Model;

//import com.fasterxml.jackson.annotation.JsonBackReference;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user_role")
public class UserRole {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String roleType;

    @OneToMany(mappedBy = "userRole",
            cascade = CascadeType.ALL)
    private List<User> users;

    public UserRole(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public List<User> getUser(){
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
