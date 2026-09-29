package com.killbridge.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.killbridge.dto.TeacherResponseDTO;
import com.killbridge.entity.UserSkill;
import com.killbridge.exception.SkillNotFoundException;
import com.killbridge.exception.UserNotFoundException;
import com.killbridge.repository.SkillRepository;
import com.killbridge.repository.UserRepository;
import com.killbridge.repository.UserSkillRepository;

@Service
public class UserSkillService {

    private final UserSkillRepository userSkillRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public UserSkillService(
            UserSkillRepository userSkillRepository,
            UserRepository userRepository,
            SkillRepository skillRepository) {

        this.userSkillRepository = userSkillRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    // Save UserSkill
    public UserSkill saveUserSkill(UserSkill userSkill) {

        // Check whether User exists
        if (!userRepository.existsById(userSkill.getUser().getId())) {
            throw new UserNotFoundException(
                    "User not found with id: "
                    + userSkill.getUser().getId()
            );
        }

        // Check whether Skill exists
        if (!skillRepository.existsById(userSkill.getSkill().getId())) {
            throw new SkillNotFoundException(
                    "Skill not found with id: "
                    + userSkill.getSkill().getId()
            );
        }

        return userSkillRepository.save(userSkill);
    }

    // Get all UserSkills
    public List<UserSkill> getAllUserSkills() {
        return userSkillRepository.findAll();
    }

    // Find users who teach a particular skill
    public List<TeacherResponseDTO> getUsersWhoTeachSkill(Long skillId) {

        List<UserSkill> userSkills =
                userSkillRepository.findBySkillIdAndType(skillId, "TEACH");

        List<TeacherResponseDTO> teachers = new ArrayList<>();

        for (UserSkill userSkill : userSkills) {

            TeacherResponseDTO teacher = new TeacherResponseDTO();

            teacher.setUserId(userSkill.getUser().getId());
            teacher.setName(userSkill.getUser().getName());
            teacher.setEmail(userSkill.getUser().getEmail());

            teacher.setSkillId(userSkill.getSkill().getId());
            teacher.setSkillName(userSkill.getSkill().getName());

            teachers.add(teacher);
        }

        return teachers;
    }
}