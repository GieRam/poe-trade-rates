define(function() {
  function init() {
    $.ajax({
      url: "http://" + window.location.host + "/trade-info/earliest",
      success: function(result) {
        $(function () {
          $('.datetimepicker')
          .datetimepicker({
            format: 'YYYY-MM-DD',
            minDate: result,
            maxDate: new Date
          })
        });
      }
    }); 
    $("select").change(function() {
      var showDateFrom = $("#from").show();
      var showDateTo = $("#to").show();
      var requestType = getRequestType();
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
  }
  
  function getRequestType() {
    return $('select option:selected').val();  
  }

  return {
    requestType: getRequestType,
    startDate: function(){return $("#dayFrom").val();},
    endDate: function(){return $("#dayTo").val();},
    init: init
  }
});