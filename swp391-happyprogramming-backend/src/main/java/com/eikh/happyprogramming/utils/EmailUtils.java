/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.utils;

import java.util.UUID;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

/**
 *
 * @author giangpt
 */
public class EmailUtils {

    public static void sendVerifyEmail(String to, String subject, String body) throws EmailException {
        HtmlEmail email = new HtmlEmail();
        email.setHostName("smtp.gmail.com");
        email.setSmtpPort(587);
        email.setAuthenticator(new DefaultAuthenticator("emiukhoahoc2722@gmail.com", "yuqszxzvsceizcvy"));
        email.setStartTLSEnabled(true);
        email.setFrom("emiukhoahoc2722@gmail.com");
        email.addTo(to);
        email.setSubject(subject);
        email.setHtmlMsg(body);
        email.send();
    }
    
    public static String generateToken(int userId) {
        // Generate a unique identifier for the token
        String token = UUID.randomUUID().toString();
        return token;
    }
}
