const showToDos = (data) => {
    const checkUserCompleted = (stage) => {
      console.log(data.votes)
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
        stages.forEach(stage => {
          let cleanStageDescription = cleanDbString(stage.content);
          if (checkUserCompleted(stage)) {
            $('#stages-list').append(`<p><s>${stage.name} - ${cleanStageDescription} </s></p><br>`)
          } else {
            $('#stages-list').append(`<p>${stage.name} - ${cleanStageDescription} <button class="small-button" id="done${stage.id}">Done <i class="fas fa-check-circle"></i></button></p>`)
          }
      });
    }

};
