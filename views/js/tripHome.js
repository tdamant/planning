$(document).ready(async () => {

  const getUrlParams = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1];
  };

  const getData = async () => {
    let tripId = await getUrlParams('id');
    let userId = await $.get("/whoami");
    let pollsData = await $.get("/polls/getPolls", {tripId: tripId });
    let votes = await $.get("/polls/votes", {tripId: tripId});
    return {
      tripId: tripId,
        userId: userId,
        pollsData: pollsData,
        votes: votes
    }
  };

  const buildPoll = (poll) => {
      let pollDiv = "";
      const addOptions = (options) => {
          options.forEach((option, index) => {
            let votes = getVotes(`${index}-poll${poll.id}`);
            console.log(votes);
            pollDiv += `<input id = "${index}-poll${poll.id}" type="checkbox"><label for ="${option}"> ${option} -- VOTES SO FAR -- ${votes} </label>`
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
          saveVotes(data.tripId, poll.id, data.userId, votes.join(','))
      });
  };

  const saveVotes = (tripId, pollId, userId, optionIds) => {
      console.log(optionIds);
      $.post("/polls/saveVotes", {tripId: tripId, pollId: pollId, userId: userId, optionIds: optionIds})
  };


  const addPolls = (polls) => {
    polls.forEach((poll) => {
        buildPoll(poll)
    });
  };

  const getVotes = (optionId) => {
    let relevantVotes =
     data.votes.filter(function(vote) {
      return vote.option_id === optionId
    });
    return relevantVotes.length;
  };

  let data = await getData();
    console.log(data);
    addPolls(data.pollsData);
  console.log(data.votes);

  $('#addStage').on("click", function() {
    $('#stageCreator').show("fast");
  });

    $('#join').click( async function() {
        await $.post("/trips_users/create", {tripId: data.tripId});
        location.reload();
    });

  $('#saveStage').on("click", function() {
    $('#stageCreator').hide("fast");
  });

});
