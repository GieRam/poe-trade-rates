$(document).ready(function() { 
  var itemId = 0;
  var items = ["Orb of Alteration", "Orb of Fusing", "Orb of Alchemy", "Chaos Orb", "Gemcutter's Prism", "Exalted Orb", "Chromatic Orb", "Jeweller's Orb", "Orb of Chance", "Cartographer's Chisel", "Orb of Scouring", "Blessed Orb", "Orb of Regret", "Regal Orb", "Divine Orb", "Vaal Orb", "Scroll of Wisdom", "Portal Scroll", "Armourer's Scrap", "Blacksmith's Whetstone", "Glassblower's Bauble",
"Orb of Transmutation", "Orb of Augmentation", "Mirror of Kalandra", "Eternal Orb", "Perandus Coin", "Silver Coin", "Sacrifice at Dusk", "Sacrifice at Midnight", "Sacrifice at Dawn", "Sacrifice at Noon", "Mortal Grief", "Mortal Rage", "Mortal Hope", "Mortal Ignorance", "Ebers Key", "Yriels Key", "Inyas Key", "Volkuurs Key", "Offering to the Goddess","Fragment of the Hydra", "Fragment of the Phoenix", "Fragment of the Minotaur", "Fragment of the Chimera", "Apprentice Cartographer's Sextant" , "Journeyman Cartographer's Sextant", "Master Cartographer's Sextant" , "Sacrifice Set", "Mortal Set", "Pale Court Set", "Fragment Set"];
  items.forEach(function(itemName) {
    var itemNameSrc = itemName.replace(/ /g,"_");
    itemId++;
    var item = "<div data-id=\""+ itemId + "\" class=\"sell-item itemtest \"><img class=\"item-icon\" src=\"../assets/images/items/" + itemNameSrc + ".png\" alt=\"" + itemName + "\" title=\"" + itemName + "\"></div>";
    $(item).appendTo(".sell-items");
  });

// setting up values for the request
  $(".sell-items .sell-item:nth-child(1)").addClass('sell-item-active');

  var buyItem = $(".buy-item");
  var sellItem = $(".sell-item");
  var buyItemNum = 4;
  var sellItemNum = 6; 
  var requestType = "get"; 
  var startDate;
  var endDate;

  
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
   
function request(datauUrl) {
  var dateLabels = [];  
  var tradeRatio = [];
  var createdAt = [];
  $.ajax({
      url: dataUrl, 
      dataType: 'json',
      success: function(result) {
        for(i = 0; i < result.length; i++) {
          tradeRatio.push(result[i]["tradeRatio"]);
          createdAt.push(result[i]["createdAt"]);
        } 
        createdAt.map(function(val) {
          dateLabels.push(milisecsToDate(val));
        })
        drawChart(dateLabels, tradeRatio); 
      }
    });
}

// Making the request for the data
var myChart = null;
  $("#button").click(function() {
  	var dataUrl = generateUrl(requestType, buyItemNum, sellItemNum, startDate, endDate);
    request(datauUrl);
  });


  function generateUrl(requestType, buyItemNum, sellItemNum, startDate, endDate) {
    var dataUrl = "http://localhost:8080/trade-info/" + requestType + "?buyItem=" + buyItemNum + "&sellItem=" + sellItemNum;    
    if(requestType == "day") {
      dataUrl += "&startDate=" + startDate; 
    }
    if(requestType == "get") {
      dataUrl += "&startDate=" + startDate + "&endDate=" + endDate;
    }  
    return dataUrl;
  }

  function drawChart(dateLabels, tradeRatio) {
    
    var data = {  
      type: 'line',
      data: {
        labels: [],
        datasets:[
          {type: 'line',
          label: 'Ratio',
          data: [],
          backgroundColor: 'rgba(174, 164, 122, 0.3)',
          pointBackgroundColor: "#9f937e",
          }
        ]
      },
      options: {} 
    }

    data.data.labels = dateLabels;
        data.data.datasets[0].data = tradeRatio;
        data.options = {
            scales: {
            xAxes: [{
              display: true,
              ticks: {
                callback: function(dataLabel, index) {
                return index % 4 === 0 ? dataLabel : '';
                }
              }
            }],
          }
        }

    if(myChart != null){
      myChart.destroy();
    } 
    var ctx = $("#chart");
     myChart = new Chart(ctx, data);
  }

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