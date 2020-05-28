package com.usersapi.Controller;

import com.usersapi.Model.Post;
import com.usersapi.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/create-post")
    public ResponseEntity<Post> createPost(@RequestBody Post post){
        return postService.createPost(post);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deletePost(){};

    @GetMapping("/list")
    public List<Post> listAllPosts(){
        return postService.listAllPosts();
    }

    @GetMapping("/list/{id}")
    public List<Post> listAllPostsByCompanyId(@PathVariable Long id){
        return postService.listAllPostsByCompanyId(id);
    }

}
