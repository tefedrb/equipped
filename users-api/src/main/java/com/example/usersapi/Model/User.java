package com.example.usersapi.Model;

//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {
    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String title;

    @Column
    private String password;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_rolename_id", nullable = false)
    private UserRole userRole;

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_company")
    private Company company;

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.REFRESH}, fetch = FetchType.LAZY)
    private WaitList waitList;

    public User() {}

    public User(Long id, String username, String title){
        this.id = id;
        this.username = username;
        this.title = title;
    }

    public void setWaitList(WaitList waitList){
        this.waitList = waitList;
    }

    public WaitList getWaitList(){
        return waitList;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Company getCompany(){
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }
}
