package com.poe.trade.rates.domain.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class TradeInfoTransformer {

    public static List<TradeInfoDto> transform(List<TradeInfo> tradeInfos) {
        return tradeInfos.stream()
                .map(TradeInfoTransformer::transform)
                .collect(Collectors.toList());
    }

    public static TradeInfoDto transform(TradeInfo tradeInfo) {
        return new TradeInfoDto(tradeInfo.getTradeRatio(), tradeInfo.getCreatedAt());
    }

}
