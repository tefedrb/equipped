package com.usersapi.Controller;

import com.usersapi.Model.Post;
import com.usersapi.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/create-post")
    public ResponseEntity<Post> createPost(Post post){
        return postService.createPost(post);
    }

}
