package com.poe.trade.rates.jobs;

import com.poe.trade.rates.domain.entity.TradeInfo;
import com.poe.trade.rates.domain.repository.TradeInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.poe.trade.rates.utils.DateUtils.oneMonthAgo;
import static com.poe.trade.rates.utils.DateUtils.oneYearAgo;

@Component
public class DatabaseCleaner {

    private TradeInfoRepository repository;

    private static final String EVERY_MONTH = "0 0 0 1 * ?";

    @Autowired
    public DatabaseCleaner(TradeInfoRepository repository) {
        this.repository = repository;
    }

    @Scheduled(cron = EVERY_MONTH)
    @Transactional
    public void clearDataOlderThanMonth() {
        List<TradeInfo> tradeInfos = repository.getTradeInfoForDateRange(oneYearAgo(), oneMonthAgo());
        tradeInfos.forEach((tradeInfo) -> repository.delete(tradeInfo));
    }
}
