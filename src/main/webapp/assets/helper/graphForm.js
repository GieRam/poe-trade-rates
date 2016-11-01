var graphForm = (function() {
    function getRequestType() {
      return $('select option:selected').val();  
    }
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
    return {
      requestType: getRequestType,
      startDate: function(){return $("#dayFrom").val();},
      endDate: function(){return $("#dayTo").val();}
    }
  })();