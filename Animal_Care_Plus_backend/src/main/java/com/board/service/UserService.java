package com.board.service;

import com.board.common.ApiResponseDto;
import com.board.common.ResponseUtils;
import com.board.common.SuccessResponse;
import com.board.common.TokenResponse;
import com.board.dto.LoginRequestDto;
import com.board.dto.SignupRequestDto;
import com.board.entity.User;
import com.board.entity.enumSet.ErrorType;
import com.board.entity.enumSet.UserRoleEnum;
import com.board.exception.RestApiException;
import com.board.jwt.JwtUtil;
import com.board.repository.BoardRepository;
import com.board.repository.CommentRepository;
import com.board.repository.LikesRepository;
import com.board.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final LikesRepository likesRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    @Transactional
    public ApiResponseDto<SuccessResponse> signup(SignupRequestDto requestDto) {
        String username = requestDto.getUsername();
        String password = passwordEncoder.encode(requestDto.getPassword());

        // 회원 중복 확인
        Optional<User> found = userRepository.findByUsername(username);
        if (found.isPresent()) {
            throw new RestApiException(ErrorType.DUPLICATED_USERNAME);
        }

        // 입력한 username, password, admin 으로 user 객체 만들어 repository 에 저장
        UserRoleEnum role = requestDto.getAdmin() ? UserRoleEnum.ADMIN : UserRoleEnum.USER;
        userRepository.save(User.of(username, password, role));

        return ResponseUtils.ok(SuccessResponse.of(HttpStatus.OK, "회원가입 성공"));
    }

    // 로그인
    @Transactional(readOnly = true)
    public ApiResponseDto<TokenResponse> login(LoginRequestDto requestDto, HttpServletResponse response) {
        String username = requestDto.getUsername();
        String password = requestDto.getPassword();

        // 사용자 확인 & 비밀번호 확인
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty() || !passwordEncoder.matches(password, user.get().getPassword())) {
            throw new RestApiException(ErrorType.NOT_MATCHING_INFO);
        }
        String token = jwtUtil.createToken(user.get().getUsername(), user.get().getRole());

        // JWT 토큰을 HTTP 응답 헤더에 추가
        response.setHeader(JwtUtil.AUTHORIZATION_HEADER, token);

        // Cache-Control 헤더 설정
        response.setHeader("Cache-Control", "public");

        // 토큰을 ApiResponseDto에 추가하여 반환
        return ResponseUtils.ok(TokenResponse.of(HttpStatus.OK, "로그인 성공", token));

        // header 에 들어갈 JWT 세팅
//        response.setHeader(JwtUtil.AUTHORIZATION_HEADER, jwtUtil.createToken(user.get().getUsername(), user.get().getRole()));
//
//        response.setHeader("Cache-Control", "public");
//
//        return ResponseUtils.ok(SuccessResponse.of(HttpStatus.OK, "로그인 성공", token));

    }

    // 회원 탈퇴
    @Transactional
    public ApiResponseDto<SuccessResponse> signout(LoginRequestDto requestDto, User user) {

        // 비밀번호 확인
        String password = requestDto.getPassword();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RestApiException(ErrorType.NOT_MATCHING_PASSWORD);
        }

        boardRepository.deleteAllByUser(user);
        commentRepository.deleteAllByUser(user);
        likesRepository.deleteAllByUser(user);
        userRepository.delete(user);

        return ResponseUtils.ok(SuccessResponse.of(HttpStatus.OK, "회원탈퇴 완료"));
    }
}
