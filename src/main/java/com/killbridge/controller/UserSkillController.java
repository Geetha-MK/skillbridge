package com.killbridge.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.killbridge.dto.TeacherResponseDTO;
import com.killbridge.entity.UserSkill;
import com.killbridge.service.UserSkillService;

@RestController
public class UserSkillController {

    private final UserSkillService userSkillService;

    public UserSkillController(UserSkillService userSkillService) {
        this.userSkillService = userSkillService;
    }

    @PostMapping("/user-skills")
    public UserSkill createUserSkill(@RequestBody UserSkill userSkill) {
        return userSkillService.saveUserSkill(userSkill);
    }

    @GetMapping("/user-skills")
    public List<UserSkill> getAllUserSkills() {
        return userSkillService.getAllUserSkills();
    }
    
    @GetMapping("/user-skills/teachers/{skillId}")
    public List<TeacherResponseDTO> getUsersWhoTeachSkill(@PathVariable Long skillId) {
        return userSkillService.getUsersWhoTeachSkill(skillId);
    }
}