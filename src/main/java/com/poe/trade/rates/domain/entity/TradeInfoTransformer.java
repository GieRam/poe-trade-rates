package com.poe.trade.rates.domain.entity;

import java.util.ArrayList;
import java.util.List;

public class TradeInfoTransformer {

    public static List<TradeInfoDto> transform(List<TradeInfo> tradeInfos) {
        List<TradeInfoDto> tradeInfoDtos = new ArrayList<>();
        for (TradeInfo tradeInfo : tradeInfos) {
            tradeInfoDtos.add(new TradeInfoDto(tradeInfo.getTradeRatio(), tradeInfo.getCreatedAt()));
        }
        return tradeInfoDtos;
    }

}
