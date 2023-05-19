/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.repository.FeatureRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kmd
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/feature")
public class FeatureController {
    @Autowired
    private JwtTokenUtil JwtTokenUtil;
    
    @Autowired
    private FeatureRepository featureRepository;
    
    @Autowired
    private JwtTokenFilter jwtTokenFilter;
    
    @GetMapping("/all")
    public ResponseEntity<?> getUserFeature(HttpServletRequest request){
        try{
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username =JwtTokenUtil.getUsernameFromToken(token);
        return ResponseEntity.ok(featureRepository.getFeatureByUserName(username)); 
        }catch(Exception e){
            System.out.println("non valid token");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
