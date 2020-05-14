package com.usersapi.Service;

import com.usersapi.Model.Comment;
import com.usersapi.Model.Post;
import com.usersapi.Model.User;
import com.usersapi.Repository.CommentRepository;
import com.usersapi.Repository.PostRepository;
import com.usersapi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    DateService dateservice;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<Comment> createComment(Comment comment, Long postId){
        // if statement checks to see if post is present
        try {
            if (postRepository.findById(postId).isPresent()) {
                Post retrievedPost = postRepository.findById(postId).get();
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                String userName = authentication.getName();
                User authorizedUser = userRepository.findByUsername(userName);

                comment.setComment_username(userName);
                comment.setUser(authorizedUser);
                comment.setPost(retrievedPost);
                comment.setComment_date(dateservice.currentDateString());

                retrievedPost.addComment(comment);
//                postRepository.save(retrievedPost);

                return ResponseEntity.ok(commentRepository.save(comment));
            }
        } catch (IllegalArgumentException e){
            System.err.println(e.getMessage());
        }
        return null;
    }

    @Override
    public HttpStatus deleteComment(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User authUser = userRepository.findByUsername(userName);
        if (commentRepository.findById(id).isPresent()) {
            Comment targetComment = commentRepository.findById(id).get();
            if(targetComment.getUser().getUsername().equals(userName) || authUser.getUserRole().getRoleType().equals("ADMIN")) {
                Post targetPost = postRepository.findById(targetComment.getPost().getId()).get();
                targetPost.removeComment(id);
                commentRepository.deleteById(id);
                postRepository.save(targetPost);
                return HttpStatus.OK;
            }
        }
        return HttpStatus.FORBIDDEN;
    }
}
