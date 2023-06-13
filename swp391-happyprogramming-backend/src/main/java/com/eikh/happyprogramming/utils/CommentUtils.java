package com.eikh.happyprogramming.utils;

import com.eikh.happyprogramming.model.Comment;
import com.eikh.happyprogramming.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentUtils {
    @Autowired
    CommentRepository commentRepository;

    public void deleteCommentAndReplies(int commentId) {
        System.out.println("DELETE COMMENT AT COMMENT-UTILS CALLED.");
        Comment comment = commentRepository.findById(commentId).get();
        if (comment != null) {
            for (Comment reply : comment.getReplies()) {
                deleteCommentAndReplies(reply.getCommentId());
            }
            commentRepository.deleteById(commentId);
        } else {
        }

    }

}
