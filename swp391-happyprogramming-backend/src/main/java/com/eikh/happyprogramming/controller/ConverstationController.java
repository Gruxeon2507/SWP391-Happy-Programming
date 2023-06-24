/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.chatModel.Message;
import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Conversation;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.model.User_Conversation;
import com.eikh.happyprogramming.modelkey.MessageKey;
import com.eikh.happyprogramming.repository.ConversationRepository;
import com.eikh.happyprogramming.repository.MessageRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.repository.User_ConversationRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author kmd
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("api/conversation")
public class ConverstationController {

    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    ConversationRepository conversationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    User_ConversationRepository userConversationRepository;

    @GetMapping()
    public List<Message> getUserConversation(HttpServletRequest request) {
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        List<Conversation> conversasions = conversationRepository.getUserConversationByUsername(username);
        List<Message> messages = new ArrayList<Message>();
        for (Conversation c : conversasions) {
            Message m = new Message();
            m.setReceiverName(c.getConversationId() + "");
            messages.add(m);
        }
        return messages;

    }

    @PostMapping("/sentmessage")
    public ResponseEntity<?> sentMessage(HttpServletRequest request, @RequestBody Message message) {
        try {
            String token = jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            if (username.equals(message.getSenderName())) {
                com.eikh.happyprogramming.model.Message m = new com.eikh.happyprogramming.model.Message();
                MessageKey mk = new MessageKey();
                mk.setConversationId(message.getConversationId());
                mk.setSentBy(message.getSenderName());

                Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
                mk.setSentAt(currentTimestamp);

                m.setMessageKey(mk);
                m.setConversation(conversationRepository.findByConversationId(message.getConversationId()));
                m.setMsgContent(message.getMessage());
                m.setUser(userRepository.findByUsername(message.getSenderName()));
                m.setContentType(message.getContentType());
                messageRepository.save(m);
                return ResponseEntity.ok(m);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        }

    }

    @GetMapping("/message/{conversationId}")
    public ResponseEntity<?> getCurrentConversationMessage(HttpServletRequest request, @PathVariable int conversationId) {
        try {
            String token = jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            User_Conversation uc = userConversationRepository.getUserConversationByUsernameAndConversationId(username, conversationId);
            if (uc != null) {
                return ResponseEntity.ok(messageRepository.getUserConversationMessage(conversationId));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

//    @GetMapping("/name/{conversationId}")
//    public ResponseEntity<?> getCurrentConversationName(HttpServletRequest request,@PathVariable int conversationId){
//
//    }
    private final String CHAT_UPLOAD_DIR = "/chat/";

    @PostMapping("/image")
    public ResponseEntity<?> uploadChatImage(@RequestParam("image") MultipartFile file,
                                             @RequestHeader("Authorization") String token) {
        String fileExtension = getFileExtension(file.getOriginalFilename());
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        if ((fileExtension.equalsIgnoreCase("jpg")) && file.getSize() < 5000000) {
            String uniqueId = UUID.randomUUID().toString(); // Generate a unique ID
            String fileName = StringUtils.cleanPath(username + "_" + uniqueId + ".jpg");
            try {
                // Save the file to the uploads directory
                String uploadDir = System.getProperty("user.dir") + CHAT_UPLOAD_DIR;
                file.transferTo(new File(uploadDir + fileName));
                return ResponseEntity.ok("http://localhost:1111/api/conversation/chat/" + fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping(value = "/chat/{fileId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<InputStreamResource> getUserAvatar(@PathVariable String fileId) throws IOException {
        String filePath = "chat/" + fileId;
        File file = new File(filePath);
        InputStream inputStream = new FileInputStream(file);
        InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + fileId);
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.IMAGE_JPEG)
                .body(inputStreamResource);
    }
    private static String getFileExtension(String fileName) {
        String extension = "";
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            extension = fileName.substring(dotIndex + 1);
        }

        return extension;
    }

}
