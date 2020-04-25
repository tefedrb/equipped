package com.usersapi.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="post_title", nullable = false)
    private String title;

    @Column(name="post_username")
    private String post_username;

    @Length(min=2, max=40000)
    @Column(name="post_txt")
    private String post_txt;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments;

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.REFRESH}, fetch = FetchType.LAZY)
    private User user;

    public void setPost_username(String user_name) {
        this.post_username = user_name;
    }

    public String getPost_username() {
        return post_username;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setComments(List<Comment> comment) {
        this.comments = comment;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public String getPost_txt() {
        return post_txt;
    }

    public void setPost_txt(String post_txt) {
        this.post_txt = post_txt;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void addComment(Comment comment){
        if(comments == null){
            comments = new ArrayList<>();
        }
        comments.add(comment);
    }
}
