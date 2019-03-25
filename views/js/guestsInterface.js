$(document).ready(function() {


  $("#addAnotherEmail").on("click", function() {
      let input = $("<input type=\"text\" class = \"attendeeEmail\"><br>")
      $('#emails').append(input)
  });

  $('#saveGuests').on("click", async() => {
      let tripId = await getUrlParams('tripId')
      let emails = [];
      $( ".attendeeEmail" ).each(function() {
          emails.push( $( this ).val())
      });
      $.post("/trips/invite", {emails: emails.join(','), tripId: tripId });
      // emails added to trip table? or trip_users? Do we want to just
      // save emails as an array, or track who has and hasn't joined
      // or even just send emails from here and not persist the data
      $.get("/trips/:" + tripId);
      //get this working
  });

  $('#next').on("click", function() {
      let tripId = getUrlParams('tripId')
      $(location).attr('href', '/organiserTripHome?tripId='+tripId)
  });
  //send to trip/tripid and have page render differently
  //dependant on whether user is organiser or not

  const getUrlParams = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1];
  };

});
