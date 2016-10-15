package com.poe.trade.rates.domain.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(indexes = {@Index(name = "BUY_ITEM", columnList = "buyItem"),
                  @Index(name = "SELL_ITEM", columnList = "sellItem")})
public class TradeInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Enumerated(EnumType.STRING)
    private BuyItem buyItem;

    @Column
    @Enumerated(EnumType.STRING)
    private SellItem sellItem;

    @Column
    private Double tradeRatio;

    @Column(nullable = false)
    @CreationTimestamp
    private Date createdAt;

    public TradeInfo() {
    }

    public TradeInfo(BuyItem buyItem, SellItem sellItem, Double tradeRatio) {
        this.buyItem = buyItem;
        this.sellItem = sellItem;
        this.tradeRatio = tradeRatio;
    }

    public BuyItem getBuyItem() {
        return buyItem;
    }

    public SellItem getSellItem() {
        return sellItem;
    }

    public Double getTradeRatio() {
        return tradeRatio;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

}
