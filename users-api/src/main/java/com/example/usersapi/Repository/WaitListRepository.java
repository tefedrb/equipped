package com.example.usersapi.Repository;

import com.example.usersapi.Model.WaitList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaitListRepository extends CrudRepository<WaitList, Long> {

}
