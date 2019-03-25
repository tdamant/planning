$(document).ready(async () => {

  const getUrlParams = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1];
  };

  // $('#pollsContainer').val( function() {
    let tripId = await getUrlParams('id')
    let pollsData = await $.get("/polls/getPolls", {tripId: tripId });
    console.log(pollsData);
  // }


  $('#addStage').on("click", function() {
    $('#stageCreator').show("fast");
  });

  $('#saveStage').on("click", function() {
    $('#stageCreator').hide("fast");
  });

});
