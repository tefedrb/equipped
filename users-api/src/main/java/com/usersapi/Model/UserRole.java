package com.usersapi.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user_role")
public class UserRole {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String roleType;

    @JsonIgnore
    @OneToMany(mappedBy = "userRole",
            cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    private List<User> users;

    public UserRole(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
