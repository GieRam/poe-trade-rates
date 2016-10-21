$(document).ready(function() { 
// Adding sell-items icons to the website
  var items = ["Orb of Alteration", "Orb of Fusing", "Orb of Alchemy", "Chaos Orb", "Gemcutter's Prism", "Exalted Orb", "Chromatic Orb", "Jeweller's Orb", "Orb of Chance", "Cartographer's Chisel", "Orb of Scouring", "Blessed Orb", "Orb of Regret", "Regal Orb", "Divine Orb", "Vaal Orb", "Scroll of Wisdom", "Portal Scroll", "Armourer's Scrap", "Blacksmith's Whetstone", "Glassblower's Bauble",
"Orb of Transmutation", "Orb of Augmentation", "Mirror of Kalandra", "Eternal Orb", "Perandus Coin", "Silver Coin", "Sacrifice at Dusk", "Sacrifice at Midnight", "Sacrifice at Dawn", "Sacrifice at Noon", "Mortal Grief", "Mortal Rage", "Mortal Hope", "Mortal Ignorance", "Ebers Key", "Yriels Key", "Inyas Key", "Volkuurs Key", "Offering to the Goddess","Fragment of the Hydra", "Fragment of the Phoenix", "Fragment of the Minotaur", "Fragment of the Chimera", "Apprentice Cartographer's Sextant" , "Journeyman Cartographer's Sextant", "Master Cartographer's Sextant" , "Sacrifice Set", "Mortal Set", "Pale Court Set", "Fragment Set"];
  for (i = 0; i < items.length; i++) {
    var itemName = items[i];
    var itemNameSrc = itemName.replace(/ /g,"_");
    var itemId = i + 1;
    var item = "<div data-id=\""+ itemId + "\" class=\"sell-item \"><img class=\"item-icon\" src=\"../assets/images/items/" + itemNameSrc + ".png\" alt=\"" + itemName + "\" title=\"" + itemName + "\"></div>";
    $(item).appendTo(".sell-items");
  }	

// setting up values for the request
  var buyItem = $(".buy-item");
  var sellItem = $(".sell-item");
  var buyItemNum = 4;
  var sellItemNum = 6; 
  var requestType = "get"; 
  var startDate;
  var endDate;
  
  $(".sell-items .sell-item:nth-child(1)").addClass('sell-item-active');
  
  buyItem.click(function(){
    buyItem.removeClass('buy-item-active');
    $(this).addClass('buy-item-active');
    buyItemNum = $(this).data("id");
  }); 
  
  sellItem.click(function(){
    sellItem.removeClass('sell-item-active');
    $(this).addClass('sell-item-active');
    sellItemNum = $(this).data("id");
  });

  $("select").change(function() {
    requestType = $('select option:selected').val();
    switch (requestType) {
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
// Creating chart
  var data = {
      labels: [],
      series: [
        []
      ]
    };
  var options = {
      axisX: {
        labelInterpolationFnc: function skipLabels(value, index) {
          switch(requestType) {
          	case "get":
            case "week":
            case "month":
              return index % 20  === 0 ? value : null;
              break;
            case "day":
              return index % 4  === 0 ? value : null;
              break;
          }
        }
      },
      axisY: {
        labelInterpolationFnc: function skipLabels(value, index) {
          if (value < 0.1) {
          	return Math.round(value * 10000) / 10000;
          } else {
          	return Math.round(value * 100) / 100;
          }
        }
      },
      plugins: [
        Chartist.plugins.tooltip()
      ]
    };

// Making the request for the data
  $("#button").click(function() {
  	var dateLabels = [];  
    var tradeRatio = [];
    var createdAt = [];
  	var dataUrl = "http://localhost:8080/trade-info/" + requestType + "?buyItem=" + buyItemNum + "&sellItem=" + sellItemNum;  	
  	if(requestType == "day") {
  	  dataUrl += "&startDate=" + startDate;	
  	}
  	if(requestType == "get") {
      dataUrl += "&startDate=" + startDate + "&endDate=" + endDate;
  	}

    $.ajax({
      url: dataUrl, 
      dataType: 'json',
      success: function(result) {
    	console.log(result);
        for(i = 0; i < result.length; i++) {
      	  tradeRatio.push(result[i]["tradeRatio"]);
      	  createdAt.push(result[i]["createdAt"]);
        } 
        createdAt.map(function(val) {
          dateLabels.push(milisecsToDate(val));
        })
        data.labels = dateLabels;
        data.series[0] = tradeRatio;
        var chart = new Chartist.Line('#chart1', data, options);
      }
    });
  });

  function milisecsToDate(val) {
  	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var date = new Date(val);
    var month = months[date.getMonth()];
    var day = date.getDate();
    var datapoint = month + "." + pad(day);
    if (requestType == "day") {
      var hour = date.getHours();
      var minutes = date.getMinutes();
      return datapoint += ", " + pad(hour) + ":" + pad(minutes); 
    } else {
      return datapoint;
    } 
  }

  function pad(val) {
    return ("00" + val).slice(-2);
  }
});