package com.example.usersapi.Model;

import javax.persistence.*;
import java.util.List;

/*
    The idea for this model will be to allow us to add users to a waitlist which
    will be associated with a company. The admins of the company will then be able to
    approve those on the waitlist (to get into the company)
 */

@Entity
@Table(name="waitlists")
public class Waitlist {
    @Id
    @Column(name="waitlist_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(mappedBy = "waitlist", cascade = {CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "associated_company")
    private Company company;

    @OneToMany(mappedBy = "waitlist", cascade = {CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
    public List<User> users;

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
}
