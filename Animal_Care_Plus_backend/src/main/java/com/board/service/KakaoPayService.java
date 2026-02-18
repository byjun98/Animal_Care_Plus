package com.board.service;

import com.board.dto.KakaoPayRequestDto;
import com.board.dto.KakaoPayResponseDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.Map;

@Service
public class KakaoPayService {

    @Value("${kakaopay.api.secret-key}")
    private String kakaoPaySecretKey;

    private static final String KAKAO_PAY_CID = "TC0ONETIME";
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String KAKAO_PAY_API_URL = "https://open-api.kakaopay.com/online/v1/payment/ready";

    public KakaoPayResponseDto preparePayment(KakaoPayRequestDto requestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "SECRET_KEY " + kakaoPaySecretKey);
        headers.set("Content-Type", "application/json");

        Map<String, Object> params = new HashMap<>();
        params.put("cid", KAKAO_PAY_CID);
        params.put("partner_order_id", requestDto.getPartnerOrderId());
        params.put("partner_user_id", requestDto.getPartnerUserId());
        params.put("item_name", requestDto.getItemName());
        params.put("quantity", requestDto.getQuantity());
        params.put("total_amount", requestDto.getTotalAmount());
        params.put("vat_amount", requestDto.getVatAmount());
        params.put("tax_free_amount", requestDto.getTaxFreeAmount());
        params.put("approval_url", requestDto.getApprovalUrl());
        params.put("fail_url", requestDto.getFailUrl());
        params.put("cancel_url", requestDto.getCancelUrl());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = restTemplate.exchange(KAKAO_PAY_API_URL, HttpMethod.POST, entity, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            return KakaoPayResponseDto.from(root);
        } catch (Exception e) {
            throw new RuntimeException("JSON 파싱 중 오류가 발생했습니다.", e);
        }
    }
}