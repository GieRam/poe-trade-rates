package com.poe.trade.rates.schedule;

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

@Component
public class DatabaseCleanUp {

    private TradeInfoRepository repository;

    private EntityManager entityManager;

    @Autowired
    public DatabaseCleanUp(TradeInfoRepository repository,
                           EntityManager entityManager) {
        this.repository = repository;
        this.entityManager = entityManager;
    }

    @Scheduled(cron = "* * 1 * *")
    @Transactional
    public void cleanUpDataOlderThanMonth() {
        List<TradeInfo> tradeInfos = repository.getTradeInfoForDateRange(getOneYearAgo(), getOneMonthAgo());
        for(TradeInfo tradeInfo : tradeInfos) {
            entityManager.remove(tradeInfo);
        }
    }

    private Date getOneYearAgo() {
        Calendar oneYearAgo = Calendar.getInstance();
        oneYearAgo.add(Calendar.YEAR, -1);
        return oneYearAgo.getTime();
    }

    private Date getOneMonthAgo() {
        Calendar oneMonthAgo = Calendar.getInstance();
        oneMonthAgo.add(Calendar.MONTH, -1);
        return oneMonthAgo.getTime();
    }
}
