package com.usersapi.Service;

import com.usersapi.Model.Comment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface CommentService {
    ResponseEntity<?> createComment(Comment comment, Long postId);
    HttpStatus deleteComment(Long id);
}
