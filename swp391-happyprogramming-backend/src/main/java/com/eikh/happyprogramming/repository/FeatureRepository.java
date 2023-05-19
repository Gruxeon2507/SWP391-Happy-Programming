/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Feature;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author kmd
 */
public interface FeatureRepository extends JpaRepository<Feature, Object> {

    @Query(value = "Select * from Feature f \n"
            + "inner join Role_Feature rf on f.featureId = rf.featureId\n"
            + "inner join `Role` r on rf.roleId = r.roleId\n"
            + "inner join User_Role ur on r.roleId = ur.roleId\n"
            + "inner join `User` u on u.username=ur.username\n"
            + "where u.username = ?1", nativeQuery = true)
    public List<Feature> getFeatureByUserName(String username);

}
