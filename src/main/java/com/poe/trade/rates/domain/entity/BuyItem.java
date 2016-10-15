package com.poe.trade.rates.domain.entity;

import java.util.HashMap;
import java.util.Map;

public enum BuyItem {

    CHAOS_ORB(4),
    EXALTED_ORB(6);

    private final int itemIndex;

    private static Map<Integer, BuyItem> buyItems = new HashMap<>();

    static {
        for (BuyItem buyItem : BuyItem.values()) {
            buyItems.put(buyItem.getItemIndex(), buyItem);
        }
    }

    BuyItem(int itemIndex) {
        this.itemIndex = itemIndex;
    }

    public int getItemIndex() {
        return itemIndex;
    }

    public static BuyItem getByIndex(Integer itemIndex) {
        return buyItems.get(itemIndex);
    }

}
