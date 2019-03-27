const showStages = (data) => {
    const checkUserCompleted = (stage) => {
      let allResponses = data.votes.filter(function(vote) {
        return vote.stage_id === stage.id
      })
      let userCompleted = allResponses.filter(function(response) {
        return response.user_id.toString() === data.userId.toString()
      })
      return userCompleted.length > 0;
    };

    let stages = data.stages;
    if(stages.length > 0) {
        stages.forEach(stage => {
          let cleanStageDescription = cleanDbString(stage.content);
          if (checkUserCompleted(stage)) {
            $('#stages-list').append(`${stage.name} - ${cleanStageDescription} <br>`)
          }
          else {
            $('#stages-list').append(`<s>${stage.name} - ${cleanStageDescription} </s><br>`)
          }
        })
    }
};
