package com.example.usersapi.Repository;

import com.example.usersapi.Model.Waitlist;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaitlistRepository extends CrudRepository<Waitlist, Long> {
    public Waitlist findByName(String name);
}
