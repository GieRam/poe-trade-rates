package com.poe.trade.rates.domain.repository;

import com.poe.trade.rates.api.tradeinfo.services.TradeInfoContext;
import com.poe.trade.rates.domain.entity.TradeInfo;

import java.util.List;

public interface TradeInfoRepository {

    List<TradeInfo> getTradeInfos(TradeInfoContext context);

    List<TradeInfo> getTradeInfoForDay(TradeInfoContext context);

    List<TradeInfo> getTradeInfosLastWeek(TradeInfoContext context);

    List<TradeInfo> getTradeInfoForMonth(TradeInfoContext context);

}
