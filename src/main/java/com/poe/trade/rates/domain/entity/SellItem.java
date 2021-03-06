package com.poe.trade.rates.domain.entity;

import java.util.HashMap;
import java.util.Map;

public enum SellItem {

    ORB_OF_ALTERATION(1),
    ORB_OF_FUSING(2),
    ORB_OF_ALCHEMY(3),
    CHAOS_ORB(4),
    GEMCUTTERS_PRISM(5),
    EXALTED_ORB(6),
    CHROMATIC_ORB(7),
    JEWELLERS_ORB(8),
    ORB_OF_CHANCE(9),
    CARTOGRAPHERS_CHISEL(10),
    ORB_OF_SCOURING(11),
    BLESSED_ORB(12),
    ORB_OF_REGRET(13),
    REGAL_ORB(14),
    DIVINE_ORB(15),
    VAAL_ORB(16),
    SCROLL_OF_WISDOM(17),
    PORTAL_SCROLL(18),
    ARMOURERS_SCRAP(19),
    BLACKSMITHS_WHETSTONE(20),
    GLASSBLOWERS_BAUBLE(21),
    ORB_OF_TRANSMUTATION(22),
    ORB_OF_AUGMENTATION(23),
    MIRROR_OF_KALANDRA(24),
    ETERNAL_ORB(25),
    PERANDUS_COIN(26),
    SILVER_COIN(27),
    SACRIFICE_AT_DUSK(28),
    SACRIFICE_AT_MIDNIGHT(29),
    SACRIFICE_AT_DAWN(30),
    SACRIFICE_AT_NOON(31),
    MORTAL_GRIEF(32),
    MORTAL_RAGE(33),
    MORTAL_HOPE(34),
    MORTAL_IGNORANCE(35),
    EBERS_KEY(36),
    YRIELS_KEY(37),
    INYAS_KEY(38),
    VOLKUURS_KEY(39),
    OFFERING_TO_THE_GODDESS(40),
    FRAGMENT_OF_THE_HYDRA(41),
    FRAGMENT_OF_THE_PHEONIX(42),
    FRAGMENT_OF_THE_MINOTAUR(43),
    FRAGMENT_OF_THE_CHIMERA(44),
    APPRENTICE_SEXTANT(45),
    JOURNEYMAN_SEXTANT(46),
    MASTER_SEXTANT(47),
    SACRIFICE_SET(48),
    MORTAL_SET(49),
    PALE_COURT_SET(50),
    SHAPER_SET(51);

    private final int itemIndex;

    private static Map<Integer, SellItem> sellItems = new HashMap<>();

    static {
        for (SellItem sellItem : SellItem.values()) {
            sellItems.put(sellItem.getItemIndex(), sellItem);
        }
    }

    SellItem(int itemIndex) {
        this.itemIndex = itemIndex;
    }

    public int getItemIndex() {
        return itemIndex;
    }

    public static SellItem getByIndex(Integer itemIndex) {
        return sellItems.get(itemIndex);
    }

}
