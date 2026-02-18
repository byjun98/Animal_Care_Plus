package com.board.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Builder;
import lombok.Getter;

@Getter
public class KakaoPayResponseDto {
    private String tid;
    private String nextRedirectPcUrl;
    private String nextRedirectMobileUrl;
    private String nextRedirectAppUrl;
    private String androidAppScheme;
    private String iosAppScheme;

    @Builder
    public KakaoPayResponseDto(String tid, String nextRedirectPcUrl, String nextRedirectMobileUrl, String nextRedirectAppUrl, String androidAppScheme, String iosAppScheme) {
        this.tid = tid;
        this.nextRedirectPcUrl = nextRedirectPcUrl;
        this.nextRedirectMobileUrl = nextRedirectMobileUrl;
        this.nextRedirectAppUrl = nextRedirectAppUrl;
        this.androidAppScheme = androidAppScheme;
        this.iosAppScheme = iosAppScheme;
    }

    public static KakaoPayResponseDto from(JsonNode root) {
        return KakaoPayResponseDto.builder()
                .tid(root.path("tid").asText())
                .nextRedirectPcUrl(root.path("next_redirect_pc_url").asText())
                .nextRedirectMobileUrl(root.path("next_redirect_mobile_url").asText())
                .nextRedirectAppUrl(root.path("next_redirect_app_url").asText())
                .androidAppScheme(root.path("android_app_scheme").asText())
                .iosAppScheme(root.path("ios_app_scheme").asText())
                .build();
    }
}

