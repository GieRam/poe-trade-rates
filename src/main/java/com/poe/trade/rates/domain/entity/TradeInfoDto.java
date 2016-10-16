package com.poe.trade.rates.domain.entity;

import java.util.Date;

public class TradeInfoDto {

    private Double tradeRatio;

    private Date createdAt;

    public TradeInfoDto(Double tradeRatio, Date createdAt) {
        this.tradeRatio = tradeRatio;
        this.createdAt = createdAt;
    }

    public Double getTradeRatio() {
        return tradeRatio;
    }

    public void setTradeRatio(Double tradeRatio) {
        this.tradeRatio = tradeRatio;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
