package com.killbridge.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;


import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToOne;

@Entity
public class UserSkill {

    @Id
    @GeneratedValue
    private Long id;

    private String type;
    
    @ManyToOne
    private User user;
    
    @ManyToOne
    private Skill skill;
    
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}