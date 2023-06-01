/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.services;

/**
 *
 * @author kmd
 */
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.UserRepository;
import com.sun.security.auth.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServices implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        try {
            return user;
        } catch (Exception e) {
            System.out.println("User not found with username: " + username);
        }
        return null;
    }

}
