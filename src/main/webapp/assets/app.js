$(document).ready(function() { 
  require(["helper/renderItems", "helper/item", "helper/graphForm", "helper/dataFetcher"], function(renderItems, item, graphForm, dataFetcher) {
    renderItems.init();
    item.init();
    graphForm.init();
    $("#button").click(function() {  
      dataFetcher.fetchData(); 
    })
  }); 
});