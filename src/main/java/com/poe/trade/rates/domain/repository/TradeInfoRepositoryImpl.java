package com.poe.trade.rates.domain.repository;

import com.poe.trade.rates.api.services.TradeInfoContext;
import com.poe.trade.rates.domain.entity.TradeInfo;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.hibernate.criterion.Projections.min;
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
        return getCriteriaBuyAndSell(context)
                .add(between("createdAt", context.getStartDate(), context.getEndDate()))
                .list();
    }

    @Override
    public List<TradeInfo> getTradeInfosForDay(TradeInfoContext context) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(context.getStartDate());
        calendar.add(Calendar.DAY_OF_MONTH, 1);

        return getCriteriaBuyAndSell(context)
                .add(between("createdAt", context.getStartDate(), calendar.getTime()))
                .list();
    }

    @Override
    public List<TradeInfo> getTradeInfosLastWeek(TradeInfoContext context) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, -7);
        return getCriteriaBuyAndSell(context)
                .add(between("createdAt", calendar.getTime(), now()))
                .list();
    }

    @Override
    public List<TradeInfo> getTradeInfosForMonth(TradeInfoContext context) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1);
        return getCriteriaBuyAndSell(context)
                .add(between("createdAt", calendar.getTime(), now()))
                .list();
    }

    @Override
    public List<TradeInfo> getTradeInfoForDateRange(Date startDate, Date endDate) {
        return getCriteria()
                .add(between("createdAt", startDate, endDate))
                .list();
    }

    @Override
    public Date getMinCreatedAt() {
        Timestamp timeStamp = (Timestamp) getCriteria()
                                                .setProjection(min("createdAt"))
                                                .uniqueResult();
        return new Date(timeStamp.getTime());
    }

    @Override
    @Transactional
    public void persistTransactional(TradeInfo tradeInfo) {
        session().persist(tradeInfo);
    }

    @Override
    public void delete(TradeInfo tradeInfo) {
        session().delete(tradeInfo);
    }

    private Criteria getCriteriaBuyAndSell(TradeInfoContext context) {
        return getCriteria()
                .add(eq("buyItem", context.getBuyItem()))
                .add(eq("sellItem", context.getSellItem()));
    }

    private Criteria getCriteria() {
        return session().createCriteria(TradeInfo.class);
    }

    private Session session() {
        return (Session) entityManager.getDelegate();
    }

    private Date now() {
        return new Date();
    }

}
