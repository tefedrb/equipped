package com.usersapi.Controller;

import com.usersapi.Model.Comment;
import com.usersapi.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/create-comment/{post_id}")
    public ResponseEntity<Comment> createCommentOnPost(@RequestBody Comment comment, @PathVariable Long post_id){
        return commentService.createComment(comment, post_id);
    }
}
