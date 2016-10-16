package com.poe.trade.rates.domain.repository;

import com.poe.trade.rates.api.tradeinfo.services.TradeInfoContext;
import com.poe.trade.rates.domain.entity.TradeInfo;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

import static org.hibernate.criterion.Restrictions.between;
import static org.hibernate.criterion.Restrictions.eq;

@SuppressWarnings("unchecked")
@Repository
public class TradeInfoRepositoryImpl implements TradeInfoRepository {

    private EntityManager entityManager;

    @Autowired
    public TradeInfoRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<TradeInfo> getTradeInfos(TradeInfoContext context) {
        return getCriteria()
                .add(eq("buyItem", context.getBuyItem()))
                .add(eq("sellItem", context.getSellItem()))
                .add(between("createdAt", context.getStartDate(), context.getEndDate()))
                .list();
    }

    @Override
    public List<TradeInfo> getTradeInfoForDay(TradeInfoContext context) {
        return null;
    }

    @Override
    public List<TradeInfo> getTradeInfosLastWeek(TradeInfoContext context) {
        return null;
    }

    @Override
    public List<TradeInfo> getTradeInfoForMonth(TradeInfoContext context) {
        return null;
    }

    @Override
    public List<TradeInfo> getTradeInfoForDateRange(Date startDate, Date endDate) {
        return getCriteria()
                .add(between("createdAt", startDate, endDate))
                .list();
    }

    private Criteria getCriteria() {
        Session session = (Session) entityManager.getDelegate();
        return session.createCriteria(TradeInfo.class);
    }

}
