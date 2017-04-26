package com.poe.trade.rates.domain.repository;

import com.poe.trade.rates.api.services.TradeInfoContext;
import com.poe.trade.rates.domain.entity.TradeInfo;

import java.util.Date;
import java.util.List;

public interface TradeInfoRepository {

    List<TradeInfo> getTradeInfos(TradeInfoContext context);

    List<TradeInfo> getTradeInfosForDay(TradeInfoContext context);

    List<TradeInfo> getTradeInfosLastWeek(TradeInfoContext context);

    List<TradeInfo> getTradeInfosForMonth(TradeInfoContext context);

    List<TradeInfo> getTradeInfoForDateRange(Date startDate, Date endDate);

    Date getMinCreatedAt();

    void persistTransactional(TradeInfo tradeInfo);

    void delete(TradeInfo tradeInfo);
}
