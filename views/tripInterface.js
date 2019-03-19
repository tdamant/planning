$(document).ready(async function() {
    const formatTripOverview = async() => {
        $('#trip-title').prepend(`${trip.name}`);
        $('#trip-description').prepend(`${trip.description}`)
        console.log(stages)
        if(stages.length > 0) {
          stages.forEach(stage => {$('#stages-list').append(`${stage.name} <br>`)})
      }
    };

    $('#submit').click(function(event) {
        event.preventDefault();
        let stageName = $('#stageName').val();
        let content = $('#stageContent').val();
        let due_date = $('#stageDueDate').val();
        $.post("/stages/create", {stageName: stageName, content: content, due_date: due_date, trip_id: trip.id });
        location.reload();
    });

    let tripName = localStorage.getItem("tripName");
    const tripObject = await fetch(`/trips/${tripName}`);
    const trip = await tripObject.json();

    let stagesObject = await fetch(`/stages/${trip.id}`)
    const stages = await stagesObject.json();

    formatTripOverview();

});
