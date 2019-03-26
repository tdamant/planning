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
    let stagesObject = await fetch(`/stages/${tripId}`);
    let stages = await stagesObject.json();
    return {
      tripId: tripId,
      userId: userId,
      pollsData: pollsData,
      votes: votes,
      stages: stages
    }
  };

  const buildPoll = (poll) => {
      let pollDiv = "";
      const addOptions = (options) => {
        options.forEach((option, index) => {
          let votes = getVotes(`${index}-poll${poll.id}`);
          pollDiv += `<input id = "${index}-poll${poll.id}" type="checkbox"><label for ="${option}"> <span id="option">${option} -- </span> <span id="votes"> VOTES SO FAR -- ${votes}</span> </label>`
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
            };
          });
        saveVotes(data.tripId, poll.id, data.userId, votes.join(','))
        location.reload()
      });
  };

  const buildPollResults = (poll) => {
    let resultsDiv = `<div id"${poll.type} > <p id"thanks"> Thanks for voting on ${poll.type.toLowerCase()}! </p> `
    const getOptions = (options) => {
      options.forEach((option, index) => {
        let votes = getVotes(`${index}-poll${poll.id}`);
        resultsDiv += `<p>${option} -- VOTES SO FAR -- ${votes}</p><br>`
      });
    };
    let options = poll.options.split(",");
    getOptions(options);
    $("#pollsContainer").append(resultsDiv);
  }

  const saveVotes = (tripId, pollId, userId, optionIds) => {
      $.post("/polls/saveVotes", {tripId: tripId, pollId: pollId, userId: userId, optionIds: optionIds})
  };

  const addPolls = async (polls) => {
    console.log('hello');
    polls.forEach((poll) => {
      let pollVotes =
      data.votes.filter(function(vote) {
        return vote.poll_id === poll.id
      })
      let usersPollVotes =
      pollVotes.filter(function(vote) {
        return vote.user_id.toString() === data.userId.toString()
      })
      console.log(usersPollVotes);
      usersPollVotes.length === 0 ? buildPoll(poll) : buildPollResults(poll);
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
  addPolls(data.pollsData);
  addToDoListeners(data);
  showStages(data);



});
