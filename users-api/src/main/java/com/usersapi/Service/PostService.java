package com.usersapi.Service;

import com.usersapi.Model.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface PostService {
    ResponseEntity<Post> createPost(Post post);
    HttpStatus deletePost(Long id);
    ResponseEntity<Post> editPost(Post post);
}
