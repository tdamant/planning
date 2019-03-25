$(document).ready(async function(){
  const fetchName = async () => {
  let currentUser = await fetch ("/users");
  let currentUserId = await currentUser.json();
  return currentUserId[0].first_name;
  };

  let name = await fetchName();

  $("#greet_user").text(`${name}`);

  const loadTrips = async () => {
    let currentUserTripsResponse = await fetch(`/users/trips`);
    let currentUserTrips = await currentUserTripsResponse.json();
    console.log(currentUserTrips)
    currentUserTrips.forEach(trip => {
      $("#user_trips").append(`<a href="/trips?id=${trip.id}">${trip.name}</a><br>`)
    });
  };

  loadTrips();
});
