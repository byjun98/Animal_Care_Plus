package com.board.controller;

import com.board.common.ApiResponseDto;
import com.board.dto.BoardResponseDto;
import com.board.dto.CommentResponseDto;
import com.board.security.UserDetailsImpl;
import com.board.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikesController {

    private final LikesService likesService;

    // 게시글 좋아요
    @PutMapping("/post/{id}")
    public ApiResponseDto<BoardResponseDto> likePost(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return likesService.likePost(id, userDetails.getUser());
    }

    // 댓글 좋아요
    @PutMapping("/comment/{id}")
    public ApiResponseDto<CommentResponseDto> likeComment(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return likesService.likeComment(id, userDetails.getUser());
    }
}
