package com.usersapi.Repository;

import com.usersapi.Model.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    @Query("FROM Comment c WHERE c.post.id = ?1")
    List<Comment> getCommentByPostId(Long id);
}
