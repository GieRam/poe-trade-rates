package com.poe.trade.rates.schedule;

import com.poe.trade.rates.domain.entity.BuyItem;
import com.poe.trade.rates.domain.entity.SellItem;
import com.poe.trade.rates.domain.entity.TradeInfo;
import org.jsoup.Jsoup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.IOException;

@Component
public class TradeRatiosCollector {

    private static final Logger log = LoggerFactory.getLogger(TradeRatiosCollector.class);

    private static final int FIFTEEN_MINUTES = 60000;

    private EntityManager entityManager;

    @Autowired
    public TradeRatiosCollector(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Scheduled(fixedDelay = FIFTEEN_MINUTES)
    @Transactional
    public void getTradeRatios() throws InterruptedException {
        for (BuyItem buyItem : BuyItem.values()) {
            for (SellItem sellItem : SellItem.values()) {
                String html = getHtml(createUrl(buyItem.getItemIndex(), sellItem.getItemIndex()));

                Double buyValue = findSellItemValue(html);
                Double sellValue = findBuyItemValue(html);
                Double tradeRatio = buyValue / sellValue;

                TradeInfo tradeInfo = new TradeInfo(buyItem, sellItem, tradeRatio);
                entityManager.persist(tradeInfo);
                Thread.sleep(1000);
            }
        }
    }

    private String createUrl(int want, int have) {
        String baseUrl = "http://currency.poe.trade/search?league=Essence&online=x&want=%s&have=%s";
        return String.format(baseUrl, want, have);
    }

    private String getHtml(String url) {
        String html = null;
        try {
            html = Jsoup.connect(url).get().html();
        } catch (IOException e) {
            log.error("Failed to connect to currency.poe.trade");
        }
        return html;
    }

    private Double findSellItemValue(String html) {
        int buyIndexStart = html.indexOf("data-buyvalue=\"") + "data-buyvalue=\"".length();
        int buyIndexEnd = html.indexOf("\" data-ign=");
        String buyValue = html.substring(buyIndexStart, buyIndexEnd);

        return Double.parseDouble(buyValue);
    }

    private Double findBuyItemValue(String html) {
        int sellIndexStart = html.indexOf("data-sellvalue=\"") + "data-sellvalue=\"".length();
        int sellIndexEnd = html.indexOf("\" data-buycurrency=\"");
        String sellValue = html.substring(sellIndexStart, sellIndexEnd);

        return Double.parseDouble(sellValue);
    }

}
