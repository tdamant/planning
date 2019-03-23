$(document).ready(function() {

  $('#buildPoll').on("click", function() {
    $('#pollCreator').show("fast");
  });

  $('#savePoll').on("click", function() {
      let tripId = getUrlParams('tripId')
      let type = $("#polls").val();
      let options = [];
      $( ".pollOption" ).each(function() {
          options.push( $( this ).val())
      });
      let deadline = $("#deadline").val();
      console.log(type+options+deadline+tripId);
      // $.post("/polls/create", {type: type, options: options, deadline: deadline, tripId: tripId });
      $('#pollCreator').hide("fast");
  });

  $('#next').on("click", function() {
    $(location).attr('href', '/guests')
  });

  $("#addAnotherOption").on("click", function() {
      let input = $("<input type=\"text\" class = \"pollOption\"><br>")
      $('#pollOptions').append(input)
  });

  const getUrlParams = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1];
  };

});

//
// /polls/create
// {
//   type: type,
//       options: optionsArray,
//     deadline: deadline,
// }