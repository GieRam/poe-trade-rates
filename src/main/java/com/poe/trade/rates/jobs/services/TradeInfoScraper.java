package com.poe.trade.rates.jobs.services;

import org.jsoup.Jsoup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class TradeInfoScraper {

    private static final Logger LOG = LoggerFactory.getLogger(TradeInfoScraper.class);

    private String urlFormat;

    public TradeInfoScraper(@Value("${trade.info.url.format}") String urlFormat) {
        this.urlFormat = urlFormat;
    }

    public String getPageForTrade(int want, int have) {
        return getPageContent(createUrl(want, have));
    }

    private String getPageContent(String url) {
        try {
            return Jsoup.connect(url).get().html();
        } catch (IOException e) {
            LOG.error("Failed to connect to: " + url);
            return null;
        }
    }

    private String createUrl(int want, int have) {
        return String.format(urlFormat, want, have);
    }

    public Double findSellItemValue(String html) {
        return findItemValue(html, "data-buyvalue=\"", "\" data-ign=");
    }

    public Double findBuyItemValue(String html) {
        return findItemValue(html, "data-sellvalue=\"", "\" data-buycurrency=\"");
    }

    private Double findItemValue(String pageContent, String startText, String endText) {
        int startIndex = pageContent.indexOf(startText) + startText.length();
        int endIndex = pageContent.indexOf(endText);

        if (isInvalidPageContent(startIndex, endIndex)) {
            return 0D;
        }

        String itemValue = pageContent.substring(startIndex, endIndex);
        return Double.parseDouble(itemValue);
    }

    private boolean isInvalidPageContent(int startIndex, int endIndex) {
        return startIndex == -1 || endIndex == -1;
    }

}
