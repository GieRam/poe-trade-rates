$(document).ready(function() {
// Adding sell-items icons to the website
  var items = ["Orb of Alteration", "Orb of Fusing", "Orb of Alchemy", "Chaos Orb", "Gemcutter's Prism", "Exalted Orb", "Chromatic Orb", "Jeweller's Orb", "Orb of Chance", "Cartographer's Chisel", "Orb of Scouring", "Blessed Orb", "Orb of Regret", "Regal Orb", "Divine Orb", "Vaal Orb", "Scroll of Wisdom", "Portal Scroll", "Armourer's Scrap", "Blacksmith's Whetstone", "Glassblower's Bauble",
"Orb of Transmutation", "Orb of Augmentation", "Mirror of Kalandra", "Eternal Orb", "Perandus Coin", "Silver Coin", "Sacrifice at Dusk", "Sacrifice at Midnight", "Sacrifice at Dawn", "Sacrifice at Noon", "Mortal Grief", "Mortal Rage", "Mortal Hope", "Mortal Ignorance", "Ebers Key", "Yriels Key", "Inyas Key", "Volkuurs Key", "Offering to the Goddess","Fragment of the Hydra", "Fragment of the Phoenix", "Fragment of the Minotaur", "Fragment of the Chimera"];
  for (i = 0; i < items.length; i++) {
    var itemName = items[i];
    var itemNameSrc = itemName.replace(/ /g,"_");
    var itemId = i + 1;
    var item = "<div data-id=\""+ itemId + "\" class=\"sell-item\"><img class=\"sell-item-icon\" src=\"../assets/images/items/" + itemNameSrc + ".png\" alt=\"" + itemName + "\" title=\"" + itemName + "\"></div>";
    $(item).appendTo(".sell-items");
  }	 
// Making the request for data
  var buyItem = 4;
  var sellItem = 6; 
  var startDate;
  var endDate;
  var select = "get"; 
  $(".buy-item").click(function() {
    buyItem = $(this).data("id");
  });
  $(".sell-item").click(function() {
    sellItem = $(this).data("id");
  });
  $("select").change(function() {
    select = $('select option:selected').val();
    switch (select) {
    	case "get":
    	  $("#from").show();
    	  $("#to").show();
    	  break;	
    	case "day":
    	  $("#from").show();
    	  $("#to").hide();
    	  break;
        case "week":
        case "month":
    	  $("#from").hide();
    	  $("#to").hide();
    	  break;
    }
  })
  $("#dayFrom").change(function() {
    startDate = $("#dayFrom").val();
  })
  $("#dayTo").change(function() {
    endDate = $("#dayTo").val();
  })
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  var dates = [];  
  var xLabels = [];
  var yLabels = [];
  var ctx = $("#myChart");
  $("#button").click(function() {
  	var dataUrl = "http://localhost:8080/trade-info/" + select + "?buyItem=" + buyItem + "&sellItem=" + sellItem;
  	if(select == "get" || select == "day") {
  	  dataUrl += "&startDate=" + startDate;	
  	}
  	if(select == "get") {
      dataUrl += "&endDate=" + endDate;
  	}
    $.ajax({
      url: dataUrl, 
      dataType: 'jsonp',
      crossDomain : true,
      success: function(result){
    	console.log(result);
        for(i = 0; i < result.length; i++) {
      	  xLabels.push(result[i]["tradeRatio"]);
      	  yLabels.push(result[i]["createdAt"]);
        } 
        yLabels.map(function(val) {
          var date = new Date(val);
          var month = months[date.getMonth()];
          var day = date.getDate();
          var hour = date.getHours();
          var minutes = date.getMinutes();
          dates.push(month + "." + pad(day) + ", " + pad(hour) + ":" + pad(minutes));
        })
      }
    });
  });
  function pad(val) {
  return ("00" + val).slice(-2);
  }
});