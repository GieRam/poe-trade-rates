package com.poe.trade.rates.jobs;

import com.poe.trade.rates.domain.entity.BuyItem;
import com.poe.trade.rates.domain.entity.SellItem;
import com.poe.trade.rates.domain.entity.TradeInfo;
import com.poe.trade.rates.domain.repository.TradeInfoRepository;
import com.poe.trade.rates.jobs.services.TradeInfoScraper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import static java.util.Objects.*;

@Component
public class TradeInfoCollector {

    private static final int DATA_COLLECT_DELAY = 970000;
    private static final int TEN_SECONDS = 10000;

    private TradeInfoRepository tradeInfoRepository;

    private TradeInfoScraper tradeInfoScraper;

    @Autowired
    public TradeInfoCollector(TradeInfoRepository tradeInfoRepository,
                              TradeInfoScraper tradeInfoScraper) {
        this.tradeInfoRepository = tradeInfoRepository;
        this.tradeInfoScraper = tradeInfoScraper;
    }

    @Scheduled(fixedDelay = DATA_COLLECT_DELAY)
    public void collectTradeRatios() throws InterruptedException {
        for (BuyItem buyItem : BuyItem.values()) {
            for (SellItem sellItem : SellItem.values()) {
                collectTradeRatio(buyItem, sellItem);
            }
        }
    }

    private void collectTradeRatio(BuyItem buyItem, SellItem sellItem) throws InterruptedException {
        String pageForTrade = tradeInfoScraper.getPageForTrade(buyItem.getItemIndex(), sellItem.getItemIndex());

        Double buyPrice = tradeInfoScraper.findSellItemValue(pageForTrade);
        Double sellPrice = tradeInfoScraper.findBuyItemValue(pageForTrade);

        if (isInvalidResponse(pageForTrade, buyPrice, sellPrice)) {
            Thread.sleep(TEN_SECONDS);
            return;
        }

        Double tradeRatio = buyPrice / sellPrice;
        tradeInfoRepository.persistTransactional(new TradeInfo(buyItem, sellItem, tradeRatio));

        Thread.sleep(TEN_SECONDS);
    }

    private boolean isInvalidResponse(String pageForTrade, Double buyPrice, Double sellPrice) {
        return isNull(pageForTrade) || hasNoPrice(buyPrice) || hasNoPrice(sellPrice);
    }

    private boolean hasNoPrice(Double price) {
        return price == 0D;
    }
}
