const makePolls = (data) => {

    const buildPoll = (poll) => {
        let pollDiv = "";
        const addOptions = (options) => {
          options.forEach((option, index) => {
            let votes = getVotes(`${index}-poll${poll.id}`);
            pollDiv += `<input id = "${index}-poll${poll.id}" type="checkbox"><label for ="${option}"> <span id="option">${option} -- </span> <span id="votes"> VOTES SO FAR -- ${votes}</span> </label>`
          });
        };
        const addDivId = (type) => {
          pollDiv += `<div class="column"><div class="grid-item container card different" id="${type}"><form id="votesFor${type}"><fieldset><legend>${type}</legend>`
        };
        let options = poll.options.split(",");
        addDivId(poll.type);
        addOptions(options);
        pollDiv += `<input id="${poll.type}-submit" type="submit"> </fieldset></form></div></div>`;
        $(".row1").append(pollDiv);

        $(`#${poll.type}-submit`).on("click", (event) => {
            event.preventDefault();
            let votes = [];
            $(`#votesFor${poll.type} input[type=checkbox]`).each( function (index) {
              if ($(`#${index}-poll${poll.id}`).prop("checked")) {
                votes.push(`${index}-poll${poll.id}`)
              };
            });
          saveVotes(data.tripId, poll.id, data.userId, votes.join(','), poll.stage_id)
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

    const saveVotes = (tripId, pollId, userId, optionIds, stageId) => {
        $.post("/polls/saveVotes", {tripId: tripId, pollId: pollId, userId: userId, optionIds: optionIds, stageId: stageId})
    };

    const addPolls = async (data) => {
      let polls = data.pollsData
      polls.forEach((poll) => {
        let pollVotes =
          data.votes.filter(function(vote) {
            return vote.poll_id === poll.id
          })
        let usersPollVotes =
          pollVotes.filter(function(vote) {
            return vote.user_id.toString() === data.userId.toString()
          })
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

    addPolls(data);
}
