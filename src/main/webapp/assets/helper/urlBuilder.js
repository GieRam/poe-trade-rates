 require(["helper/graphForm" ], function(graphForm) {});

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
  })();