var renderItems = (function() {
  var itemId = 0;
  var items = ["Orb of Alteration", "Orb of Fusing", "Orb of Alchemy", "Chaos Orb", "Gemcutter's Prism", "Exalted Orb", "Chromatic Orb", "Jeweller's Orb", "Orb of Chance", "Cartographer's Chisel", "Orb of Scouring", "Blessed Orb", "Orb of Regret", "Regal Orb", "Divine Orb", "Vaal Orb", "Scroll of Wisdom", "Portal Scroll", "Armourer's Scrap", "Blacksmith's Whetstone", "Glassblower's Bauble", "Orb of Transmutation", "Orb of Augmentation", "Mirror of Kalandra", "Eternal Orb", "Perandus Coin", "Silver Coin", "Sacrifice at Dusk", "Sacrifice at Midnight", "Sacrifice at Dawn", "Sacrifice at Noon", "Mortal Grief", "Mortal Rage", "Mortal Hope", "Mortal Ignorance", "Ebers Key", "Yriels Key", "Inyas Key", "Volkuurs Key", "Offering to the Goddess","Fragment of the Hydra", "Fragment of the Phoenix", "Fragment of the Minotaur", "Fragment of the Chimera", "Apprentice Cartographer's Sextant" , "Journeyman Cartographer's Sextant", "Master Cartographer's Sextant" , "Sacrifice Set", "Mortal Set", "Pale Court Set", "Fragment Set"];
  items.forEach(function(itemName) {
    var itemNameSrc = itemName.replace(/ /g,"_");
    itemId++;
    var item = "<div id=\""+ itemId + "\" class=\"sell-item \"><img class=\"item-icon\" src=\"../assets/images/items/" + itemNameSrc + ".png\" alt=\"" + itemName + "\" title=\"" + itemName + "\"></div>";
    $(item).appendTo(".sell-items");
  });
  $(".sell-items .sell-item:nth-child(1)").addClass('sell-item-active');
})();