var item = require("./item");
var graphForm = require("./graphForm");

function buildUrl() {
  var requestType = graphForm.requestType();
  var buyItem = item.buyId();
  var sellItem = item.sellId();
  var dateFrom = graphForm.startDate();
  var dateEnd = graphForm.endDate();
  var dataUrl = "http://" + window.location.host + "/trade-info/" + requestType + "?buyItem=" + buyItem + "&sellItem=" + sellItem;    
  if(requestType == "day") {
    dataUrl += "&startDate=" + dateFrom; 
  }
  if(requestType == "get") {
    dataUrl += "&startDate=" + dateFrom + "&endDate=" + dateEnd;
  }  
  return dataUrl;
  }
  
module.exports = {
  build: buildUrl
}
  
  