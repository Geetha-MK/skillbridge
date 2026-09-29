package com.killbridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.killbridge.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}