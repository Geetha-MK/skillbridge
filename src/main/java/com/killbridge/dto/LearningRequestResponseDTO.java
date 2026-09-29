package com.killbridge.dto;

import com.killbridge.entity.LearningRequestStatus;

public class LearningRequestResponseDTO {

    private Long id;

    private LearningRequestStatus status;

    private Long userId;
    private String userName;
    private String userEmail;

    private Long teacherId;
    private String teacherName;
    private String teacherEmail;

    private Long skillId;
    private String skillName;


    public LearningRequestResponseDTO() {
    }


    public LearningRequestResponseDTO(
            Long id,
            LearningRequestStatus status,
            Long userId,
            String userName,
            String userEmail,
            Long teacherId,
            String teacherName,
            String teacherEmail,
            Long skillId,
            String skillName) {

        this.id = id;
        this.status = status;

        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;

        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.teacherEmail = teacherEmail;

        this.skillId = skillId;
        this.skillName = skillName;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public LearningRequestStatus getStatus() {
        return status;
    }

    public void setStatus(LearningRequestStatus status) {
        this.status = status;
    }


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }


    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }


    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }


    public String getTeacherEmail() {
        return teacherEmail;
    }

    public void setTeacherEmail(String teacherEmail) {
        this.teacherEmail = teacherEmail;
    }


    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }


    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
}