$(document).ready(function() {

  $('#buildPoll').on("click", function() {
    $('#pollCreator').show("fast");
  });

  $('#savePoll').on("click", function() {
      console.log($("#polls").val());
      $( ".pollOption" ).each(function( index ) {
          console.log( index + ": " + $( this ).val() );
      });
      console.log($("#deadline").val());
      $('#pollCreator').hide("fast");
  });

  $('#next').on("click", function() {
    $(location).attr('href', '/guests')
  });

  $("#addAnotherOption").on("click", function() {
      let input = $("<input type=\"text\" class = \"pollOption\"><br>")
      $('#pollOptions').append(input)
  })
});
