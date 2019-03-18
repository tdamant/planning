$(document).ready(async function() {
    const formatTripOverview = async() => {
        $('#trip-title').prepend(`${trip.name}`)
    };

    let tripName = document.location.search;
    tripName = tripName.substring(1, tripName.length);
    const tripObject = await fetch(`/trips/${tripName}`);
    const trip = await tripObject.json();
    console.log(trip);
    formatTripOverview();
});
