package com.usersapi.Repository;

import com.usersapi.Model.WaitList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaitListRepository extends CrudRepository<WaitList, Long> {
    // Get waitList by userName
    @Query("FROM WaitList w, User u WHERE u.username = ?1 AND u.waitList.id = w.id")
    WaitList findWaitListByUserName(String username);
}
