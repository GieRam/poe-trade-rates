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

    private static final int FIFTEEN_MINUTES = 900000;

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
                if (buyValue == 0D || sellValue == 0D) {
                    Thread.sleep(10000);
                    continue;
                }
                Double tradeRatio = buyValue / sellValue;

                TradeInfo tradeInfo = new TradeInfo(buyItem, sellItem, tradeRatio);
                entityManager.persist(tradeInfo);
                entityManager.flush();
                Thread.sleep(10000);
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
        return findItemValue(html, "data-buyvalue=\"", "\" data-ign=");
    }

    private Double findBuyItemValue(String html) {
        return findItemValue(html, "data-sellvalue=\"", "\" data-buycurrency=\"");
    }

    private Double findItemValue(String html, String startText, String endText) {
        int startIndex = html.indexOf(startText) + startText.length();
        int endIndex = html.indexOf(endText);
        if (startIndex == -1 || endIndex == -1) {
            return 0D;
        }
        String itemValue = html.substring(startIndex, endIndex);

        return Double.parseDouble(itemValue);
    }

}
