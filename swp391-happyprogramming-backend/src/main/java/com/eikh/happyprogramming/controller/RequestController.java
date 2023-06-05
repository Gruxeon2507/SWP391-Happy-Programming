/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.Request;
import com.eikh.happyprogramming.repository.RequestRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/requests")
public class RequestController {
    @Autowired
    RequestRepository requestRepository;
    
    @GetMapping
    List<Request> getRequests(){
        return  requestRepository.findAll();
    }
}
