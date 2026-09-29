package com.killbridge.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.killbridge.entity.Skill;
import com.killbridge.exception.SkillNotFoundException;
import com.killbridge.repository.SkillRepository;
import com.killbridge.repository.UserSkillRepository;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    private final UserSkillRepository userSkillRepository;
    public SkillService(
            SkillRepository skillRepository,
            UserSkillRepository userSkillRepository) {

        this.skillRepository = skillRepository;
        this.userSkillRepository = userSkillRepository;
    }

    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
    
    public void deleteSkill(Long id) {
    	
    	if (!skillRepository.existsById(id)) {
    	    throw new SkillNotFoundException(
    	            "Skill not found with id: " + id
    	    );
    	}
        if (userSkillRepository.existsBySkillId(id)) {
            throw new IllegalStateException(
                    "Cannot delete skill because it is currently being used by users"
            );
        }

        skillRepository.deleteById(id);
    }
}