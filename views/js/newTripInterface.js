$(document).ready(function() {
    $('#submit').click( async function() {
      console.log('hello');
        let tripName = $('#tripName').val();
        let description = $('#description').val();
        // let trip = await $.post("/trips/create", {tripName: tripName, description: description});
        // $(location).attr('href', `/trip?${trip.id}`)
        $(location).attr('href', `/polls`) // append with trip id
    });
});
