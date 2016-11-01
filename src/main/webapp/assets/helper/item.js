require(["helper/renderItems" ], function(renderItems) {});

var item = (function() {
    var buyItem = $(".buy-item");
    var sellItem = $(".sell-item");
    buyItem.click(function(){
      buyItem.removeClass("buy-item-active");
      $(this).addClass("buy-item-active");
    })
    sellItem.click(function(){
      sellItem.removeClass("sell-item-active");
      $(this).addClass("sell-item-active");
    })
    function getBuyId() {
      return $(".buy-item-active").attr("id");
    }
    function getSellId() {
      return $(".sell-item-active").attr("id");
    }
    return {
      buyId: getBuyId,
      sellId: getSellId
    }
  })();