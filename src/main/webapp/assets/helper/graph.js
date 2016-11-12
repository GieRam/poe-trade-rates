var Chart = require("chart.js");
var graphForm = require("./graphForm");

var myChart = null;
var requestType = graphForm.requestType();
function drawGraph(dateLabels, tradeRatio) {
  var graphData = {  
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
  graphData.data.labels = dateLabels;
  graphData.data.datasets[0].data = tradeRatio;
  graphData.options = {
    scales: {
      xAxes: [{
        display: true,
        ticks: {
          callback: function(dateLabels, index) {
            if(requestType === "day") {
              return index % 2 === 0 ? dateLabels : '';
            } else {
              return index % 7 === 0 ? dateLabels : '';
            }
            
          }
        }
      }],
    }
  }
  var ctx = $(".chart");
  myChart = new Chart(ctx, graphData);
}

module.exports = {
  draw: drawGraph
}
