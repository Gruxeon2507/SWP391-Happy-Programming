/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.DTO;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author anlal
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostDTO {
    private int postId;

    private Date postedAt;
    private String postContent;
    private String postByUsername;
    private String postByDisplayName;
}
