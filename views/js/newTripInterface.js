$(document).ready(function() {

    $('#submit').click( async function(event) {
        event.preventDefault();
        let tripName = $('#tripName').val();
        let cleanTripName = cleanStringForDb(tripName);
        let description = $('#description').val();
        let cleanDescription = cleanStringForDb(description);
        let trip = await $.post("/trips/create", {tripName: cleanTripName, description: cleanDescription});
        $(location).attr('href', `/trip?${trip.id}`)
    });
});


