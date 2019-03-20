$(document).ready(function() {
    $('#submit').click( async function(event) {
        event.preventDefault();
        let tripName = $('#tripName').val();
        let description = $('#description').val();
        let trip = await $.post("/trips/create", {tripName: tripName, description: description});
        $(location).attr('href', `/trip?${trip.id}`)
    });
});


