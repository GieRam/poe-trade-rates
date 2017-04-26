package com.poe.trade.rates.api.services;

import com.poe.trade.rates.domain.entity.TradeInfoDto;
import com.poe.trade.rates.domain.repository.TradeInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import static com.poe.trade.rates.domain.entity.TradeInfoTransformer.transform;

@Service
public class TradeInfoService {

    private TradeInfoRepository repository;

    @Autowired
    public TradeInfoService(TradeInfoRepository repository) {
        this.repository = repository;
    }

    public List<TradeInfoDto> getTradeInfos(TradeInfoContext context) {
        return transform(repository.getTradeInfos(context));
    }

    public List<TradeInfoDto> getTradeInfosLastWeek(TradeInfoContext context) {
        return transform(repository.getTradeInfosLastWeek(context));
    }

    public List<TradeInfoDto> getTradeInfosForDay(TradeInfoContext context) {
        return transform(repository.getTradeInfosForDay(context));
    }

    public List<TradeInfoDto> getTradeInfosForMonth(TradeInfoContext context) {
        return transform(repository.getTradeInfosForMonth(context));
    }

    public Date getEarliestTradeInfo() {
        return repository.getMinCreatedAt();
    }
}
