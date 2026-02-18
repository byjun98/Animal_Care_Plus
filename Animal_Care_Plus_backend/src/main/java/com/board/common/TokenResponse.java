package com.board.common;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class TokenResponse {
    private int status;
    private String message;
    private String token; // 토큰 필드 추가

    @Builder
    private TokenResponse(int status, String message, String token) {
        this.status = status;
        this.message = message;
        this.token = token; // 토큰 값 설정
    }

    public static TokenResponse of(HttpStatus status, String message, String token) {
        return TokenResponse.builder()
                .status(status.value())
                .message(message)
                .token(token) // 토큰 값 설정
                .build();
    }
}
