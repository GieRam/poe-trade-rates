$(document).ready(function() { 

// render sell items 
  (function() {
    var itemId = 0;
    var items = ["Orb of Alteration", "Orb of Fusing", "Orb of Alchemy", "Chaos Orb", "Gemcutter's Prism", "Exalted Orb", "Chromatic Orb", "Jeweller's Orb", "Orb of Chance", "Cartographer's Chisel", "Orb of Scouring", "Blessed Orb", "Orb of Regret", "Regal Orb", "Divine Orb", "Vaal Orb", "Scroll of Wisdom", "Portal Scroll", "Armourer's Scrap", "Blacksmith's Whetstone", "Glassblower's Bauble", "Orb of Transmutation", "Orb of Augmentation", "Mirror of Kalandra", "Eternal Orb", "Perandus Coin", "Silver Coin", "Sacrifice at Dusk", "Sacrifice at Midnight", "Sacrifice at Dawn", "Sacrifice at Noon", "Mortal Grief", "Mortal Rage", "Mortal Hope", "Mortal Ignorance", "Ebers Key", "Yriels Key", "Inyas Key", "Volkuurs Key", "Offering to the Goddess","Fragment of the Hydra", "Fragment of the Phoenix", "Fragment of the Minotaur", "Fragment of the Chimera", "Apprentice Cartographer's Sextant" , "Journeyman Cartographer's Sextant", "Master Cartographer's Sextant" , "Sacrifice Set", "Mortal Set", "Pale Court Set", "Fragment Set"];
    items.forEach(function(itemName) {
      var itemNameSrc = itemName.replace(/ /g,"_");
      itemId++;
      var item = "<div id=\""+ itemId + "\" class=\"sell-item itemtest \"><img class=\"item-icon\" src=\"../assets/images/items/" + itemNameSrc + ".png\" alt=\"" + itemName + "\" title=\"" + itemName + "\"></div>";
      $(item).appendTo(".sell-items");
    });
    $(".sell-items .sell-item:nth-child(1)").addClass('sell-item-active');
  })();

// setting up values for the request

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
  })()

  var graphForm = (function() {
    $("select").change(function() {
      var showDateFrom = $("#from").show();
      var showDateTo = $("#to").show();
      requestType = $('select option:selected').val();
      switch (requestType) { 
        case "day":
          showDateTo.toggle();
          break;
        case "week":
        case "month":
          showDateTo.toggle();
          showDateFrom.toggle();
          break;
        default:
          showDateFrom;
          showDateTo;
          break;
      }
    });
    return {
      requestType: function(){return $('select option:selected').val();},
      startDate: function(){return $("#dayFrom").val();},
      endDate: function(){return $("#dayTo").val();}
    }
  })()

  var urlBuilder = (function() {
    function buildUrl() {
      var requestType = graphForm.requestType();
      var buyItem = item.buyId();
      var sellItem = item.sellId();
      var dateFrom = graphForm.startDate();
      var dateEnd = graphForm.endDate();
      var dataUrl = "http://localhost:8080/trade-info/" + requestType + "?buyItem=" + buyItem + "&sellItem=" + sellItem;    
      if(requestType == "day") {
        dataUrl += "&startDate=" + dateFrom; 
      }
      if(requestType == "get") {
        dataUrl += "&startDate=" + dateFrom + "&endDate=" + dateEnd;
      }  
      return dataUrl;
    }
    return {
      build: buildUrl
    }
  })()
  
  var dataFetcher = (function() {
  var myChart = null;
    function fetch() {
      var dateLabels = []; 
      var tradeRatio = [];
      var createdAt = [];
      var dataUrl = urlBuilder.build();
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
          drawGraph(dateLabels,tradeRatio);   
        }
      }); 
    }

    function drawGraph(dateLabels, tradeRatio) {
      var graph = {  
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
      if (myChart != null ) {
        myChart.destroy()
      }; 
      graph.data.labels = dateLabels;
      graph.data.datasets[0].data = tradeRatio;
      graph.options = {
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              callback: function(dateLabels, index) {
                return index % 6 === 0 ? dateLabels : '';
              }
            }
          }],
        }
      }
      var ctx = $("#chart");
      myChart = new Chart(ctx, graph);
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
    return {
      fetchData : fetch
    } 
  })()
  
  $("#button").click(function() {  
    dataFetcher.fetchData(); 
  })
// Making the request for the data
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
