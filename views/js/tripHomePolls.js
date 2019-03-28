
const makePolls = (data) => {

    const buildPoll = (poll) => {
        let pollDiv = "";
        const addOptions = (options) => {
          options.forEach((option, index) => {
            let votes = getVotes(`${index}-poll${poll.id}`);
            pollDiv += `
                          <label class="pollLabel">
                          <input class="checkbox" id = "${index}-poll${poll.id}" type="checkbox">
                           ${option} </label>

                        <span id="votes"> VOTES SO FAR -- ${votes}</span><br> `
          });
        };
        const addDivId = (type) => {
          pollDiv += `<div class="column">
                        <div class="grid-item container card different" id="${type}">

                        <fieldset id="votesFor${type}">
                        <legend>${type}</legend>`
        };
        let options = poll.options.split(",");
        addDivId(poll.type);
        addOptions(options);
        pollDiv += `<input id="${poll.type}-submit" type="submit" value="Save Vote">
                  </fieldset>

              </div>
            </div>`;
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
      let resultsDiv =
      `<div class="column">
      <div class="grid-item container card different" id"${poll.type}">
      <p id"thanks" > Thanks for voting on the ${poll.type.toLowerCase()}! </p><br>`
      const getOptions = (options) => {
        options.forEach((option, index) => {
          let votes = getVotes(`${index}-poll${poll.id}`);
          resultsDiv += `<p id="votesSoFar">${option} -- VOTES SO FAR -- ${votes}</p><br>`
        });
        resultsDiv += '</div></div>'
      };
      let options = poll.options.split(",");
      getOptions(options);
      $(".row1").append(resultsDiv);
    };

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
};
