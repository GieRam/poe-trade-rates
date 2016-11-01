$(document).ready(function() { 

  require(["helper/renderItems", "helper/item", "helper/dataFetcher"], function(renderItems, item, dataFetcher) {});
  
  $("#button").click(function() {  
    dataFetcher.fetchData(); 
  })
});

/*var items = {
  init: function() {
    this.cacheDom(),
    this.bindEvents()
  },
  cacheDom : function() {   
    this.buyItem = $(".buy-item");
    this.sellItem = $(".sell-item");
    this.buyItemNum = $(".buy-item-active").attr("id");
    this.sellItemNum = $(".sell-item-active").attr("id");
  },
  bindEvents : function() {
    this.buyItem.on('click', this.activateBuy.bind(this));
    this.sellItem.on('click', this.activateSell.bind(this));
  },
  activateBuy: function() {
    this.buyItem.removeClass("buy-item-active");
    $(document.getElementById($(this).attr("id"))).addClass("buy-item-active");
  },
  activateSell: function() {
    this.sellItem.removeClass("sell-item-active");
  }
 } 
items.init();*/
