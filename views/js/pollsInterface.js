$(document).ready(function() {

  $('#buildPoll').on("click", function() {
      if ($("#polls").val()) {
      $('#pollCreator').show("fast");
    } else {
      alert('Please pick a Poll to create from the drop down list.')
    }
  });

  $('#savePoll').on("click", function() {
      const updatePage = (type) => {
          $(`#${type}Poll`).remove();
          $(`#pollsCreated`).append(`${type} <br>`)
      };
      let tripId = getUrlParams('id');
      let type = $("#polls").val();
      let options = [];
      $( ".pollOption" ).each(function() {
          options.push( $( this ).val())
      });
      let deadline = $("#deadline").val();
      $.post("/polls/create", {type: type, options: options.join(','), deadline: deadline, tripId: tripId });
      updatePage(type);
      $('#pollCreator').hide("fast");
  });

  $('#guests').on("click", function() {
    let tripId = getUrlParams('id');
    $(location).attr('href', '/guests?tripId='+tripId)
  });

  $("#addAnotherOption").on("click", function() {
      let input = $("<input type=\"text\" class = \"pollOption\"><br>");
      $('#pollOptions').append(input)
  });

  const getUrlParams = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1];
  };

});
