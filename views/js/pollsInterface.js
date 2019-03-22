$(document).ready(function() {

  $('#buildPoll').on("click", function() {
    $('#pollCreator').show("fast");
  });

  $('#savePoll').on("click", function() {
    $('#pollCreator').hide("fast");
  });

  $('#next').on("click", function() {
    $(location).attr('href', '/guests')
  });

});
