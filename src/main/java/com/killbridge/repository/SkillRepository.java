package com.killbridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.killbridge.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {

}