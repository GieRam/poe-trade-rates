$(document).ready(function() { 

  require(["helper/renderItems", "helper/item", "helper/dataFetcher"], function(renderItems, item, dataFetcher) {});
  
  $("#button").click(function() {  
    dataFetcher.fetchData(); 
  })

  $(function () {
                $('#datetimepicker').datetimepicker({
                    format: 'YYYY-MM-DD',
                    maxDate: new Date
                });
            });

    $(function () {
                $('#datetimepicker1').datetimepicker({
                    format: 'YYYY-MM-DD',
                    maxDate: new Date
                });
            });
});