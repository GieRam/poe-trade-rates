package com.poe.trade.rates.api.tradeinfo.services;

import com.poe.trade.rates.domain.entity.BuyItem;
import com.poe.trade.rates.domain.entity.SellItem;

import java.util.Date;

public class TradeInfoContext {

    private BuyItem buyItem;

    private SellItem sellItem;

    private Date startDate;

    private Date endDate;

    public TradeInfoContext(Integer buyItem, Integer sellItem) {
        this.buyItem = BuyItem.getByIndex(buyItem);
        this.sellItem = SellItem.getByIndex(sellItem);
    }

    public TradeInfoContext(Integer buyItem,
                            Integer sellItem,
                            Date startDate,
                            Date endDate) {
        this.buyItem = BuyItem.getByIndex(buyItem);
        this.sellItem = SellItem.getByIndex(sellItem);
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public BuyItem getBuyItem() {
        return buyItem;
    }

    public SellItem getSellItem() {
        return sellItem;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }
}
