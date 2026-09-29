package com.killbridge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.killbridge.entity.UserSkill;

public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {

    List<UserSkill> findBySkillIdAndType(Long skillId, String type);
    
    boolean existsBySkillId(Long skillId);
}