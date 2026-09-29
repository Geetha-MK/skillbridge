package com.killbridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.killbridge.entity.Connection;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
}