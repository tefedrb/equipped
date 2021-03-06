package com.usersapi.Service;

import com.usersapi.Model.Company;
import com.usersapi.Model.Post;
import com.usersapi.Model.User;
import com.usersapi.Repository.CompanyRepository;
import com.usersapi.Repository.PostRepository;
import com.usersapi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    DateService dateService;

    @Autowired
    AuthorizedUser authorizedUser;

    @Override
    public ResponseEntity<Post> createPost(Post post){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userName = authentication.getName();

            User authorizedUser = userRepository.findByUsername(userName);

            post.setPost_username(userName);
            post.setUser(authorizedUser);
            authorizedUser.addPost(post);

            Company userCompany = authorizedUser.getCompany();

            userCompany.addPost(post);

            post.setCompany(userCompany);

            post.setPost_date(dateService.currentDateString());

            return ResponseEntity.ok(postRepository.save(post));

        } catch (IllegalArgumentException e){
            System.err.println(e.getMessage());
        }
        return null;
    }

    @Override
    public ResponseEntity<Post> editPost(Post post){
        if(postRepository.findById(post.getId()).isPresent()){
            Post retrievedPost = postRepository.findById(post.getId()).get();
            retrievedPost.setTitle(post.getTitle());
            retrievedPost.setPost_txt(post.getPost_txt());
            return ResponseEntity.ok(postRepository.save(retrievedPost));
        } else {
            return null;
        }
    }

    @Override
    public ResponseEntity<?> deletePost(Post post) throws Exception {
        // Add functionality for users with an ADMIN UserRole
        // Get UserAuthorized user
        User authUser = authorizedUser.getUser();
        // With the authUser check if user exists and is an admin
        if(authUser.getUserRole().getRoleType().equals("ADMIN")) {
            if (postRepository.findById(post.getId()).isPresent()) {
                Post targetPost = postRepository.findById(post.getId()).get();
                // Get target company
                Company postCompany = companyRepository.findById(targetPost.getCompany().getId()).get();
                // Remove post from post's company entity
                postCompany.removePost(targetPost);
                // Remove post from user
                authUser.removePost(targetPost);
                userRepository.save(authUser);
                companyRepository.save(postCompany);
                postRepository.deleteById(post.getId());
                return ResponseEntity.ok(HttpStatus.OK);
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @Override
    public List<Post> listAllPosts(){
        return (List<Post>) postRepository.findAll();
    }

    @Override
    public List<Post> listAllPostsByCompanyId(Long id) throws IllegalArgumentException {
        return postRepository.findPostsByCompanyId(id);
    }
}
