$(document).ready(async function() {
    const formatTripOverview = async() => {
        $('#trip-title').prepend(`${trip.name}`);
        $('#trip-description').prepend(`${trip.description}`);

          const showStages = () => {
              if(stages.length > 0) {
                  stages.forEach(stage => {$('#stages-list').append(`${stage.name} <br>`)})
              }
          };

          const showAttendees = () => {
              usersOnTrip.forEach( user => {
                  $('#attendees-list').append( `${user.first_name} ${user.last_name}`)
              })
          };

        showStages();
        showAttendees();
    };

    $('#submit').click(function(event) {
        event.preventDefault();
        let stageName = $('#stageName').val();
        let content = $('#stageContent').val();
        let due_date = $('#stageDueDate').val();
        $.post("/stages/create", {stageName: stageName, content: content, due_date: due_date, trip_id: trip.id });
        location.reload();
    });

    let tripName = await localStorage.getItem("tripName");
    const tripObject = await fetch(`/trips/${tripName}`);
    console.log(tripObject);
    const trip = await tripObject.json();

    let stagesObject = await fetch(`/stages/${trip.id}`);
    const stages = await stagesObject.json();

    let usersOnTripResponse = await fetch(`/trips_users/${trip.id}`);
    let usersOnTrip = await usersOnTripResponse.json();
    console.log(usersOnTrip);

    formatTripOverview();

});
