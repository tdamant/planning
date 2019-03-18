$(document).ready(function() {
    $('#submit').click(function(event) {
        event.preventDefault();
        let tripName = $('#tripName').val();
        let description = $('#description').val();
        let attendee1 = $('#attendee1').val();
        let tripStart = $('#tripStart').val();
        let tripEnd = $('#tripEnd').val();
        $.post("/trips/create", {tripName: tripName, description: description, attendee1: attendee1, tripStart: tripStart, tripEnd: tripEnd});
        $(location).attr('href', `/trip?${tripName}`)
    });
});
