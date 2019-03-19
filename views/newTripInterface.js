$(document).ready(function() {
    $('#submit').click(function(event) {
        event.preventDefault();
        let tripName = $('#tripName').val();
        let description = $('#description').val();
        $.post("/trips/create", {tripName: tripName, description: description});
        localStorage.setItem("tripName", tripName);
        $(location).attr('href', `/trip?${tripName}`)
    });
});
