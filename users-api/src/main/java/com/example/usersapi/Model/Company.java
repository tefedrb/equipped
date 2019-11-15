package com.example.usersapi.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "companies")
public class Company {
    @Id
    @GeneratedValue
    private long company_id;

    @Column(unique = true)
    private String name;

    @Column
    private String type;

    @OneToMany(mappedBy = "company", cascade = {CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
    @JsonIgnore
    private List<User> users;

    public long getCompany_id() {
        return company_id;
    }

    public void setCompany_id(long company_id){
        this.company_id = company_id;
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
}
