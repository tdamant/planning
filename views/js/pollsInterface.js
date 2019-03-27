$(document).ready(function() {

const getUrlParams = (name) => {
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1];
};

const setMinDate = () => {
    let dateToday = new Date(Date.now()).toISOString().split('T')[0];
    $('#deadline').attr('min', dateToday)
};

setMinDate();

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


    const checkInput = (date) => {
      if(date === "") {
          alert("please enter a deadline")
      }
      else {
          return true
      }
    };

    const getOptions = () => {

      let options = [];
      $( ".pollOption" ).each(function() {
          options.push( $( this ).val())
      });
      return options.join(",")
    };

    const getPollData = () => {
      return {
           tripId: getUrlParams('tripId'),
       type: $("#polls").val(),
       deadline: $("#deadline").val(),
       options: getOptions()
    }
    };
        let data = getPollData();
    if (checkInput(data.deadline)) {
      $.post("/polls/create", data);
      updatePage(data.type)
    }
 });



});

$('#guests').on("click", function() {
    let tripId = getUrlParams('tripId');

    $(location).attr('href', '/guests?tripId='+tripId)
    });

$("#addAnotherOption").on("click", function() {
    let input = $("<input type=\"text\" class = \"pollOption\"><br>");
    $('#pollOptions').append(input)
    });

});
