const showToDos = (data) => {
    const checkUserCompleted = (stage) => {
      console.log(data.votes);
      let allResponses = data.votes.filter(function(vote) {
        return vote.stage_id.toString() === stage.id.toString()
      })
      let userCompleted = allResponses.filter(function(response) {
        return response.user_id.toString() === data.userId.toString()
      })
      return userCompleted.length > 0;
    };

    let stages = data.stages;
    if(stages.length > 0) {
      console.log('hello');
        stages.forEach(stage => {
          let cleanStageDescription = cleanDbString(stage.content);
          if (checkUserCompleted(stage)) {
            $('#stages-list').append(`<s>${stage.name} - ${cleanStageDescription} </s><br>`)
          } else {
            $('#stages-list').append(`${stage.name} - ${cleanStageDescription} <br>`)
          }
        })
    }
};
