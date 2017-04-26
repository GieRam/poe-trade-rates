package com.poe.trade.rates.api.resources;

import com.poe.trade.rates.api.services.TradeInfoContext;
import com.poe.trade.rates.api.services.TradeInfoService;
import com.poe.trade.rates.domain.entity.TradeInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/trade-info")
public class TradeInfoResource {

    private TradeInfoService tradeInfoService;

    @Autowired
    public TradeInfoResource(TradeInfoService tradeInfoService) {
        this.tradeInfoService = tradeInfoService;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<TradeInfoDto> list(@NotNull @RequestParam Integer buyItem,
                                   @NotNull @RequestParam Integer sellItem,
                                   @NotNull @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                   @NotNull @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) throws ParseException {
        TradeInfoContext context = new TradeInfoContext(buyItem, sellItem, startDate, endDate);
        return tradeInfoService.getTradeInfos(context);
    }

    @RequestMapping(value = "/list/last/day", method = RequestMethod.GET)
    public List<TradeInfoDto> getForDay(@NotNull @RequestParam Integer buyItem,
                                        @NotNull @RequestParam Integer sellItem,
                                        @NotNull @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate) throws ParseException {
        TradeInfoContext context = new TradeInfoContext(buyItem, sellItem, startDate);
        return tradeInfoService.getTradeInfosForDay(context);
    }

    @RequestMapping(value = "/list/last/week", method = RequestMethod.GET)
    public List<TradeInfoDto> getForLastWeek(@NotNull @RequestParam Integer buyItem,
                                             @NotNull @RequestParam Integer sellItem) {
        TradeInfoContext context = new TradeInfoContext(buyItem, sellItem);
        return tradeInfoService.getTradeInfosLastWeek(context);
    }

    @RequestMapping(value = "/list/last/month", method = RequestMethod.GET)
    public List<TradeInfoDto> getForLastMonth(@NotNull @RequestParam Integer buyItem,
                                              @NotNull @RequestParam Integer sellItem) {
        TradeInfoContext context = new TradeInfoContext(buyItem, sellItem);
        return tradeInfoService.getTradeInfosForMonth(context);
    }

    @RequestMapping(value = "/minimum/creation/date", method = RequestMethod.GET)
    public Date getEarliestDate() {
        return tradeInfoService.getEarliestTradeInfo();
    }

}
