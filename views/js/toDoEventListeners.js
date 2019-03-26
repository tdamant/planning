const addToDoListeners = (data) => {
  $('#addStage').on("click", function() {
    $('#stageCreator').show("fast");
  });

  $('#saveStage').on("click", function() {
    $('#stageCreator').hide("fast");
    const getStageValues = () => {
      return {
        due_date: $('#stageDeadlineInput').val(),
        content: $('#stageContentInput').val(),
        stageName: $('#stageNameInput').val()
      }
    }
    let stageValues = getStageValues();
    console.log(stageValues);
    $.post("/stages/create", {trip_id: data.tripId, due_date: stageValues.due_date, content: stageValues.content, stageName: stageValues.stageName})
  });
}
