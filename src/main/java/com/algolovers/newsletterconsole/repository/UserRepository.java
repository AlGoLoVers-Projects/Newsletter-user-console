package com.algolovers.newsletterconsole.repository;

import com.algolovers.newsletterconsole.data.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmailAddress(String username);

    Boolean existsByEmailAddress(String email);

}

