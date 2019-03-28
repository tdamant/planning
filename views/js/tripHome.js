$(document).ready(async () => {

  const getUrlParams = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1];
  };

  const getData = async () => {
    let tripId = await getUrlParams('id');
    let userId = await $.get("/whoami");
    let stagesObject = await fetch(`/stages/${tripId}`);
    let stages = await stagesObject.json();
    let pollsData = await $.get("/polls/getPolls", {tripId: tripId });
    let votes = await $.get("/polls/votes", {tripId: tripId});
    let tripResponse = await fetch(`/trips/${tripId}`);
    let trip = await tripResponse.json();
    let tripOrganiserId = trip.organiser;
    return {
      tripOrganiserId: tripOrganiserId,
      tripId: tripId,
      userId: userId,
      stages: stages,
      pollsData: pollsData,
      votes: votes
    }
  };


  const loadOrganiserPriveledges = () => {
    if (data.userId.toString() === data.tripOrganiserId.toString()) {
      $('#addStage').show();
    };
  }


  let data = await getData();

  makePolls(data);
  showToDos(data);
  loadOrganiserPriveledges();

  $('#join').click( async function() {
      await $.post("/trips_users/create", {tripId: data.tripId});
      location.reload();
  });

  $('#saveStage').click(function(event) {
      event.preventDefault();
      $('#stageCreator').hide("fast");
      let stageName = $('#stageName').val();
      let content = $('#stageContent').val();
      let cleanContent = cleanStringForDb(content);
      let due_date = $('#stageDueDate').val();
      $.post("/stages/create", {stageName: stageName, content: cleanContent, due_date: due_date, trip_id: data.tripId });
      $('#stageCreator').find('input:text').val('');
      location.reload();
  });

  $('#closeStageCreator').click(function(event) {
      event.preventDefault();
      $('#stageCreator').hide("fast");
      $('#stageCreator').find('input:text').val('');
  });

  $( "button[id^='done']" ).click(function(event) {
    event.preventDefault();
    let stageCompleted = ($(this).attr('id')).substr(4);
    $.post("/polls/saveResponse", {tripId: data.tripId, userId: data.userId, stageId: stageCompleted})
    location.reload();
  })

  $('#addStage').on("click", function() {
    $('#stageCreator').show("fast");
  });

  console.log(organiserId)

});
