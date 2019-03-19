$(document).ready(async function() {
    const formatTripOverview = async() => {
        $('#trip-title').prepend(`${trip.name}`);
        $('#trip-description').prepend(`${trip.description}`)
    };

    $('#submit').click(function(event) {
        event.preventDefault();
        let stageName = $('#stageName').val();
        let content = $('#stageContent').val();
        let due_date = $('#stageDueDate').val();
        $.post("/stages/create", {stageName: stageName, content: content, due_date: due_date, trip_id: trip.id });
    });

    let tripName = localStorage.getItem("tripName");
    const tripObject = await fetch(`/trips/${tripName}`);
    const trip = await tripObject.json();
    formatTripOverview();
});
