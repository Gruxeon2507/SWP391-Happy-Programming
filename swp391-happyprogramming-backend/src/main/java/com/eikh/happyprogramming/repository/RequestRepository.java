/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Request;
import com.eikh.happyprogramming.modelkey.RequestKey;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author 
 */
public interface RequestRepository extends JpaRepository<Request, RequestKey>{
    
}
