require("bootstrap-datepicker-webpack/js/bootstrap-datepicker");
require("bootstrap-datepicker-webpack/dist/css/bootstrap-datepicker.standalone.css");

function init() {
  $('.datepicker').datepicker;
  $("select").change(function() {
    var showDateFrom = $("#from").show();
    var showDateTo = $("#to").show();
    var requestType = getRequestType();
    switch (requestType) { 
      case "list/last/day":
        showDateTo.toggle();
        break;
      case "list/last/week":
      case "list/last/month":
        showDateTo.toggle();
        showDateFrom.toggle();
        break;
      default:
        showDateFrom;
        showDateTo;
        break;
    }
  });
}

function getRequestType() {
  return $('select option:selected').val();  
}

module.exports = {
  requestType: getRequestType,
  startDate: function(){return $("#dayFrom").val();},
  endDate: function(){return $("#dayTo").val();},
  init: init
}
