package com.usersapi.Repository;

import com.usersapi.Model.WaitList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaitListRepository extends CrudRepository<WaitList, Long> {

}
