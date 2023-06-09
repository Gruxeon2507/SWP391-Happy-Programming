/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author giangpt
 */
public interface SkillRepository extends JpaRepository<Skill, Integer>{
    
}
