package com.example.usersapi.Model;

//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "companies")
public class Company {
    @Id
    @Column(name="company_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column
    private String type;

    @Column
    private String password;

    @OneToMany(mappedBy = "company", cascade = {CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
    private List<User> users;

    @OneToMany(mappedBy = "company", cascade = {CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
    private List<User> waitList;

    public List<User> getWaitList(){
        return this.waitList;
    }

    public void setWaitList(List<User> waitList) {
        this.waitList = waitList;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public Long getCompany_id() {
        return id;
    }

    public void setCompany_id(Long company_id){
        this.id = company_id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getType(){
        return type;
    }

    public void setType(String type){
        this.type = type;
    }

    public List<User> getUsers(){
        return users;
    }

    public void setUsers(List<User> users){
        this.users = users;
    }

    public void addUsers(User user){
        if(users == null){
            users = new ArrayList<>();
        }
        users.add(user);
    }

    public void addToWaitList(User user){
        if(waitList == null){
            waitList = new ArrayList<>();
        }
        waitList.add(user);
    }
}
