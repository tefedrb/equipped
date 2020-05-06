package com.usersapi.Controller;

import com.usersapi.Model.Comment;
import com.usersapi.Repository.CommentRepository;
import com.usersapi.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    CommentService commentService;

    @Autowired
    CommentRepository commentRepository;

    @PostMapping("/create-comment/{post_id}")
    public ResponseEntity<Comment> createCommentOnPost(@RequestBody Comment comment, @PathVariable Long post_id) {
        return commentService.createComment(comment, post_id);
    }

    @GetMapping("/list-by-post/{post_id}")
    public List<Comment> getCommentsByPostId(@PathVariable Long post_id){
        if(commentRepository.getCommentByPostId(post_id) != null) {
            return commentRepository.getCommentByPostId(post_id);
        } else {
            return null;
        }
    }
}
