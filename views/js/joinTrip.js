$(document).ready(async function() {
    const formatTripOverview = async() => {
        let dbName = data.trip.name;
        let name = cleanDbString(dbName);
        $('#trip-title').prepend(`${name}`);

        let dbDescription = data.trip.description;
        let description = cleanDbString(dbDescription);

        $('#trip-description').prepend(`${description}`);

        const showAttendees = () => {
            data.usersOnTrip.forEach( user => {
                $('#attendees-list').append( `${user.first_name} ${user.last_name} <br>`)
            })
        };

        const formatForTripMembers = () => {
            isOn ? $('#join').hide() : $('.tripOverview').hide()
          };

        showAttendees();
        formatForTripMembers();
    };



    // delete function for removing users:
    $.delete = function(url, data, callback, type){
      if ( $.isFunction(data) ){
          type = type || callback,
              callback = data,
              data = {}
        }
        return $.ajax({
          url: url,
          type: 'DELETE',
          success: callback,
          data: data,
          contentType: type
        });
      }

    $("#leaveTrip").click(function(event) {
      event.preventDefault();
      $.delete("/users/trips/", {tripId: data.trip.id}, function(response){
        if (response === "success"){
          location.reload();
          alert("You've left the trip :(")
        };

      });
    });

    const fetchData = async () => {
        let tripId = location.search.substr(4);
        let tripResponse = await fetch(`/trips/${tripId}`);
        let trip = await tripResponse.json();
        let stagesObject = await fetch(`/stages/${tripId}`);
        let stages = await stagesObject.json();
        let usersOnTripResponse = await fetch(`/trips_users/${tripId}`);
        let usersOnTrip = await usersOnTripResponse.json();
        let currentUser = await fetch ("/whoami");
        let currentUserId = await currentUser.json();
        return {
            trip: trip,
            stages: stages,
            usersOnTrip: usersOnTrip,
            currentUserId: currentUserId
        };

    };

    let data = await fetchData();

    const isUserOnTrip = () => {
        return data.usersOnTrip.filter((user) => {
            return user.id === data.currentUserId
        }).length > 0
    };

    let isOn = isUserOnTrip();

    formatTripOverview();

});
