package com.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoPayRequestDto {
    private String partnerOrderId;
    private String partnerUserId;
    private String itemName;
    private int quantity;
    private int totalAmount;
    private int vatAmount;
    private int taxFreeAmount;
    private String approvalUrl;
    private String failUrl;
    private String cancelUrl;
}