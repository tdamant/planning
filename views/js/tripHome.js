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
        pollDiv += `<div id="${type}"><form action=""><fieldset><legend>${type}</legend>`
      };

      let options = poll.options.split(",");
      addDivId(poll.type);
      addOptions(options);
      pollDiv += `<input id="${poll.type}-submit" type="submit"> </fieldset></form> </div>`;
      $("#pollsContainer").append(pollDiv);
      $(`#${poll.type}-submit`).on("click", (event) => {
          event.preventDefault();
          {
            option: y/n,

          },
          $("/polls").post({})
      })
  };

  const addPolls = (polls) => {
      polls.forEach((poll) => {
          buildPoll(poll)
      });
  };

  let tripId = await getUrlParams('id');
  let pollsData = await $.get("/polls/getPolls", {tripId: tripId });
  addPolls(pollsData);

  $('#addStage').on("click", function() {
    $('#stageCreator').show("fast");
  });

  $('#saveStage').on("click", function() {
    $('#stageCreator').hide("fast");
  });

});
