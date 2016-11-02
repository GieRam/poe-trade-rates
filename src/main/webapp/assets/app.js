$(document).ready(function() { 

  require(["helper/renderItems", "helper/item", "helper/dataFetcher"], function(renderItems, item, dataFetcher) {});
  
  $("#button").click(function() {  
    dataFetcher.fetchData(); 
  })

});