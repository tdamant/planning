$(document).ready(function() {


  $("#addAnotherEmail").on("click", function() {
      let input = $("<input type=\"text\" class = \"attendeeEmail\"><br>")
      $('#emails').append(input)
  });

  $('#sendEmails').on("click", async() => {
    let emails = [];
    $( ".attendeeEmail" ).each(function() {
        if($(this).val() != "") {emails.push( $( this ).val())}
    });
    let tripId = await getUrlParams('tripId');
    emails.forEach(email => {
      $.post("/send-email", {to: email, tripId: tripId});
    });
    $('.emailconf').css("display", "block");
  });

  $('#saveGuests').on("click", async() => {
      let tripId = await getUrlParams('tripId')
      let emails = [];
      $( ".attendeeEmail" ).each(function() {
          emails.push( $( this ).val())
      });
      //$.post("/trips/invite", {emails: emails.join(','), tripId: tripId });

      // emails added to trip table? or trip_users? Do we want to just
      // save emails as an array, or track who has and hasn't joined
      // or even just send emails from here and not persist the data
      $(location).attr('href', '/trip_home?id='+tripId)
          // $(location).attr('href', '/trips')
  });

  const getUrlParams = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1];
  };

});
