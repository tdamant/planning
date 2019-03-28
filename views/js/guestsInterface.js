$(document).ready(function() {


  $("#addAnotherEmail").on("click", function() {
      let input = $("<input type=\"text\" class = \"attendeeEmail\"><br>")
      $('#emails').append(input)
  });

  $('#sendEmails').on("click", async() => {

    let emails = [];
    $( ".attendeeEmail" ).each(function() {
        if($(this).val() != "") {
            emails.push( $( this ).val());
            $( this ).val("");
        };
    });
    let tripId = await getUrlParams('tripId');
    emails.forEach(email => {
      $.post("/send-email", {to: email, tripId: tripId});
    });
    $('.emailconf').css("display", "block");
    emails.forEach(email => {
        $('#list').append(`<li> ${email} </li><br>`)
    });
  });

  $('#saveGuests').on("click", async() => {
      let tripId = await getUrlParams('tripId')
      $(location).attr('href', '/trip_home?id='+tripId)
  });

  const getUrlParams = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1];
  };

});
