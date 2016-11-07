$(document).ready(function() { 
  var renderItems = require("./helper/renderItems");
  var item = require("./helper/item");
  var graphForm = require("./helper/graphForm");
  var dataFetcher = require("./helper/dataFetcher");

  renderItems.init();
  item.init();
  graphForm.init();
  
  $("#button").click(function() {  
    dataFetcher.fetchData(); 
  })
});
