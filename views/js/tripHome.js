$(document).ready(async () => {

  const getUrlParams = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1];
  };

  let tripId = await getUrlParams('id');
  let userId = await $.get("/whoami")
  let pollsData = await $.get("/polls/getPolls", {tripId: tripId });
  addPolls(pollsData);

  $('#addStage').on("click", function() {
    $('#stageCreator').show("fast");
  });

  $('#saveStage').on("click", function() {
    $('#stageCreator').hide("fast");
  });

  const buildPoll = (poll) => {
    let pollDiv = "";
    const addOptions = (options) => {
      options.forEach((option, index) => {
        pollDiv += `<input id = "${index}-poll${poll.id}" type="checkbox"><label for ="${option}"> ${option}</label>`
      });
    };
    const addDivId = (type) => {
      pollDiv += `<div id="${type}"><form id="votesFor${type}"><fieldset><legend>${type}</legend>`
    };
    let options = poll.options.split(",");
    addDivId(poll.type);
    addOptions(options);
    pollDiv += `<input id="${poll.type}-submit" type="submit"> </fieldset></form> </div>`;
    $("#pollsContainer").append(pollDiv);
    $(`#${poll.type}-submit`).on("click", (event) => {
      event.preventDefault();
      let votes = [];
      $(`#votesFor${poll.type} input[type=checkbox]`).each( function (index) {
          if ($(`#${index}-poll${poll.id}`).prop("checked")) {
            votes.push(`${index}-poll${poll.id}`)
          }
      });
      saveVotes(poll.id, userId, votes.join(','))
    });
  };

  const saveVotes = (pollId, userId, optionIds) => {
    $.post("/polls/saveVotes", {pollId: pollId, userId: userId, optionIds: optionIds})
  };

  const addPolls = (polls) => {
    polls.forEach((poll) => {
      buildPoll(poll)
    });
  };



});
