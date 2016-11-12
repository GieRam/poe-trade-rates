function init() {
  var buyItem = $(".item-buy");
  var sellItem = $(".item-sell");
  buyItem.click(function(){
    buyItem.removeClass("item-is-active");
    $(this).addClass("item-is-active");
  })
  sellItem.click(function(){
    sellItem.removeClass("item-is-active");
    $(this).addClass("item-is-active");
  })
}
function getBuyId() {
  return $(".item-buy.item-is-active").attr("id");
}
function getSellId() {
  return $(".item-sell.item-is-active").attr("id");
}
module.exports = {
  buyId: getBuyId,
  sellId: getSellId, 
  init: init
}
