package com.usersapi.Repository;

import com.usersapi.Model.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {

    @Query("FROM Post p WHERE p.company.id = ?1")
    List<Post> findPostsByCompanyId(Long id);
}
