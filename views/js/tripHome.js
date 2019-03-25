$(document).ready(async () => {

  const getUrlParams = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1];
  };

  const buildPoll = (poll) => {
      let pollDiv = "";
      const addOptions = (options) => {
        options.forEach((option) => {
          pollDiv += `<input id = "${option}" type="checkbox"><label for ="${option}"> ${option}</label>`
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
        let votes = []
        $(`#votesFor${poll.type} input[type=checkbox]`).each( function (element) {
          console.log(this);
          if (this.prop('checked')) { votes.push(element) }
          console.log(votes);
        });
      });
  };

  const saveVotes = (pollId, userId, optionIds) => {
    $.post("/polls/saveVotes", {pollId: pollId, userId: userId, optionIds: optionIds})
  }

  const addPolls = (polls) => {
      polls.forEach((poll) => {
          buildPoll(poll)
      });
  };

  let tripId = await getUrlParams('id');
  let userId = await $.get("/whoami")
  let pollsData = await $.get("/polls/getPolls", {tripId: tripId });
  console.log(pollsData);
  addPolls(pollsData);

  $('#addStage').on("click", function() {
    $('#stageCreator').show("fast");
  });

  $('#saveStage').on("click", function() {
    $('#stageCreator').hide("fast");
  });

});
