package com.eikh.happyprogramming.utils;

import org.mindrot.jbcrypt.BCrypt;

import java.util.Random;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author giangpt
 */
public class AuthenticationUtils {

    /**
     * *
     * Author: giangpthe170907
     *
     * @param password
     * @return
     */
    public static String hashPassword(String password) {
        // Generate a salt for the password hash
        String salt = BCrypt.gensalt();

        // Hash the password with the generated salt
        String hashedPassword = BCrypt.hashpw(password, salt);
//        String truncatedPassword = hashedPassword.substring(0, Math.min(hashedPassword.length(), 50));

        // Return the hashed password
        return hashedPassword;
    }

    /**
     * *
     * Author: giangpthe170907
     *
     * @param password
     * @param hashedPassword
     * @return
     *
     */
    public static boolean checkPassword(String password, String hashedPassword) {
        // Check if the entered password matches the hashed password
        boolean passwordMatch = BCrypt.checkpw(password, hashedPassword);

        // Return whether the password matches or not
        return passwordMatch;
    }

    public static String generateRandomCode(int length) {
        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder codeBuilder = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            codeBuilder.append(randomChar);
        }

        return codeBuilder.toString();
    }
}
