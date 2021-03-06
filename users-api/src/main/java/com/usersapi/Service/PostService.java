package com.usersapi.Service;

import com.usersapi.Model.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostService {
    ResponseEntity<Post> createPost(Post post);
    ResponseEntity<?> deletePost(Post post) throws Exception;
    ResponseEntity<Post> editPost(Post post);
    List<Post> listAllPosts();
    List<Post> listAllPostsByCompanyId(Long id);
}