define(["helper/urlBuilder", "helper/graphForm", "helper/graph"], function(urlBuilder, graphForm, graph) {
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
            dateLabels.push(millisecsToDate(val));
          })
          graph.draw(dateLabels,tradeRatio);   
        }
      }); 
    }

    function millisecsToDate(val) {
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var date = new Date(val);
      var month = months[date.getMonth()];
      var day = date.getDate();
      var datapoint = month + "." + pad(day);
      if (graphForm.requestType() == "day") {
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
});
