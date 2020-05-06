package com.usersapi.Service;

import com.usersapi.Model.Comment;
import com.usersapi.Model.Post;
import com.usersapi.Repository.CommentRepository;
import com.usersapi.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    DateService dateservice;

    @Override
    public ResponseEntity<Comment> createComment(Comment comment, Long postId){
        // if statement checks to see if post is present
        try {
            if (postRepository.findById(postId).isPresent()) {
                Post retrievedPost = postRepository.findById(postId).get();
                comment.setComment_date(dateservice.currentDateString());
                retrievedPost.addComment(comment);
                postRepository.save(retrievedPost);
                return ResponseEntity.ok(commentRepository.save(comment));
            }
        } catch (IllegalArgumentException e){
            System.err.println(e.getMessage());
        }
        return null;
    }

    @Override
    public HttpStatus deleteComment(Long id) {
        if (commentRepository.findById(id).isPresent()) {
            commentRepository.deleteById(id);
            return HttpStatus.OK;
        }
        return HttpStatus.FORBIDDEN;
    }
}
