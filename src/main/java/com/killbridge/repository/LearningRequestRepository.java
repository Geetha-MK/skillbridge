package com.killbridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.killbridge.entity.LearningRequest;

public interface LearningRequestRepository extends JpaRepository<LearningRequest, Long> {
}