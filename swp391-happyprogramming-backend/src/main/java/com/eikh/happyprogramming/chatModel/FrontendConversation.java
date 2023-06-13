package com.eikh.happyprogramming.chatModel;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class FrontendConversation {
    private int conversationId;
    private String conversationName;
    private String username;
}
