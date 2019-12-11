package com.example.usersapi.Model;

import com.example.usersapi.JSONviews.WaitListViews;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/*
    The idea for this model will be to allow us to add users to a waitlist which
    will be associated with a company. The admins of the company will then be able to
    approve those on the waitlist (to get into the company)
 */
@Entity
@Table(name="waitList")
public class WaitList {
    @Id
    @Column(name="waitlist_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonIgnore
    @OneToOne(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JoinColumn(name = "associated_company")
    private Company company;

    @OneToMany(mappedBy = "waitList", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
    public List<User> users;

    public void setUsers(List<User> users){
        this.users = users;
    }

    public List<User> getUsers(){
        return users;
    }

    public void setId(Long id){
        this.id = id;
    }

    public long getId(){
        return this.id;
    }

    public Company getCompany(Company company){
        return this.company;
    }

    public void setCompany(Company company){
        this.company = company;
    }

    public Company getCompany(){
        return this.company;
    }

    public void addUsers(User user){
        if(users == null){
            users = new ArrayList<>();
        }
        users.add(user);
    }
}
