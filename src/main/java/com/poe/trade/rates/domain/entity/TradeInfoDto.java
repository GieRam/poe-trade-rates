package com.poe.trade.rates.domain.entity;

import java.util.Date;

public class TradeInfoDto {

    private Double tradeRatio;

    private Date createdAt;

    public TradeInfoDto(Double tradeRatio, Date createdAt) {
        this.tradeRatio = tradeRatio;
        this.createdAt = createdAt;
    }

}
