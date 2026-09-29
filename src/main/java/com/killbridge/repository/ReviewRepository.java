package com.killbridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.killbridge.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}