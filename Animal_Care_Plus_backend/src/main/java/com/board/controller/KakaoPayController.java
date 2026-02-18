package com.board.controller;

import com.board.dto.KakaoPayRequestDto;
import com.board.dto.KakaoPayResponseDto;
import com.board.service.KakaoPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class KakaoPayController {

    @Autowired
    private KakaoPayService kakaoPayService;

    @PostMapping("/kakaoPay")
    public ResponseEntity<KakaoPayResponseDto> kakaoPay(@RequestBody KakaoPayRequestDto requestDto) {
        KakaoPayResponseDto response = kakaoPayService.preparePayment(requestDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}