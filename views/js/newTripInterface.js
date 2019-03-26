$(document).ready(function() {
    $('#submit').click( async function(event) {
        event.preventDefault();
        let tripName = $('#tripName').val();
        let description = $('#description').val();
        let cleanDescription = description.replace(/'/g , "\\");
        let trip = await $.post("/trips/create", {tripName: tripName, description: cleanDescription});
        $(location).attr('href', `/create_poll?id=${trip.id}`)
    });
});
