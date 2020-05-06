package com.usersapi.Model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "company")
public class Company {
    @Id
    @Column(name = "company_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Length(min=3, max=15)
    @Column(unique = true, nullable = false)
    private String name;

    @Column
    private String type;

    @Column
    private String password;

    // Removed mappedBy in the relationship because this side isn't the owning side.
    @JsonManagedReference
    @OneToMany(cascade = {CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH},fetch = FetchType.EAGER)
    private List<User> users;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private WaitList waitList;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Post> posts;

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public void addPost(Post post){
        if(posts == null){
            this.posts = new ArrayList<>();
        }
        posts.add(post);
    }

    public void removePost(Post post){
        this.posts.removeIf(p -> p.getId().equals(post.getId()));
    }

    public WaitList getWaitList(){
        return this.waitList;
    }

    public void setWaitList(WaitList waitList) {
        this.waitList = waitList;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long company_id){
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
}
