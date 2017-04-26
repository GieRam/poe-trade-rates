package com.poe.trade.rates.utils;

import java.util.Calendar;
import java.util.Date;

public class DateUtils {

    public static Date oneYearAgo() {
        Calendar oneYearAgo = Calendar.getInstance();
        oneYearAgo.add(Calendar.YEAR, -1);
        return oneYearAgo.getTime();
    }

    public static Date oneMonthAgo() {
        Calendar oneMonthAgo = Calendar.getInstance();
        oneMonthAgo.add(Calendar.MONTH, -1);
        return oneMonthAgo.getTime();
    }
}
