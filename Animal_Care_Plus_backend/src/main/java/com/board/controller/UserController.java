package com.board.controller;

import com.board.common.ApiResponseDto;
import com.board.common.SuccessResponse;
import com.board.common.TokenResponse;
import com.board.dto.LoginRequestDto;
import com.board.dto.SignupRequestDto;
import com.board.security.UserDetailsImpl;
import com.board.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ApiResponseDto<SuccessResponse> signup(@Valid @RequestBody SignupRequestDto requestDto) {
        return userService.signup(requestDto);
    }

    @PostMapping("/login")
    public ApiResponseDto<TokenResponse> login(@RequestBody LoginRequestDto requestDto, HttpServletResponse response) {
        return userService.login(requestDto, response);
    }

    @PostMapping("/signout")
    public ApiResponseDto<SuccessResponse> signout(@RequestBody LoginRequestDto requestDto, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return userService.signout(requestDto, userDetails.getUser());
    }
}
