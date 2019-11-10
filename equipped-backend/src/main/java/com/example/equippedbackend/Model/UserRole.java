package com.example.equippedbackend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "userRole")
public class UserRole {
    @Id
    @GeneratedValue
    private int id;
    private String role_type;

    @OneToMany(mappedBy = "userRole",
            cascade = CascadeType.ALL)
    @JsonIgnore
    private List<User> user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole_type(){
        return role_type;
    }

    public void setRole_type(String role_type){
        this.role_type = role_type;
    }
}
