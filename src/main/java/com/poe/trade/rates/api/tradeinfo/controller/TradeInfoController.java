package com.poe.trade.rates.api.tradeinfo.controller;

import com.poe.trade.rates.api.tradeinfo.services.TradeInfoContext;
import com.poe.trade.rates.api.tradeinfo.services.TradeInfoService;
import com.poe.trade.rates.domain.entity.TradeInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/trade-info")
public class TradeInfoController {

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    private TradeInfoService tradeInfoService;

    @Autowired
    public TradeInfoController(TradeInfoService tradeInfoService) {
        this.tradeInfoService = tradeInfoService;
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public List<TradeInfoDto> getTradeInfos(@NotNull @RequestParam Integer buyItem,
                                            @NotNull @RequestParam Integer sellItem,
                                            @NotNull @RequestParam String startDate,
                                            @NotNull @RequestParam String endDate) throws ParseException {
        Date dateStart = DATE_FORMAT.parse(startDate);
        Date dateEnd = DATE_FORMAT.parse(endDate);

        TradeInfoContext context = new TradeInfoContext(buyItem, sellItem, dateStart, dateEnd);

        return tradeInfoService.getTradeInfos(context);
    }

    @RequestMapping(value = "/week", method = RequestMethod.GET)
    public List<TradeInfoDto> getTradeInfosLastWeek(@NotNull @RequestParam Integer buyItem,
                                                    @NotNull @RequestParam Integer sellItem) {
        TradeInfoContext context = new TradeInfoContext(buyItem, sellItem);

        return tradeInfoService.getTradeInfosLastWeek(context);
    }

}
