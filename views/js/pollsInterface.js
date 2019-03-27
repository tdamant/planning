$(document).ready(async function() {

    const getUrlParams = (name) => {
        let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1];
    };

    const setMinDate = () => {
        let dateToday = new Date(Date.now()).toISOString().split('T')[0];
        $('#deadline').attr('min', dateToday)
    };

    const buildPollOptions = (existingPolls) => {
        const findTypesToAdd = (existingPolls) => {
            let existingPollTypes = [];
            existingPolls.forEach((poll) => {
                existingPollTypes.push(poll.type)
            });
            let options = ['Dates', 'Location', 'Budget'];
            return newArr = options.filter(x => !existingPollTypes.includes(x));
        };
        let typesToAdd = findTypesToAdd(existingPolls);
        typesToAdd.forEach((type) => {
            $('#polls').append(`<option id="${type}Poll">${type}</option>`)
        });
    };

    setMinDate();

    const getExistingPolls = async () => {
        let tripId = getUrlParams('tripId');
        let pollsResponse = await fetch(`/polls/getPolls?tripId=${tripId}`);
        return await pollsResponse.json();
    };

    $('#buildPoll').on("click", function() {
          if ($("#polls").val()) {
          $('#pollCreator').show("fast");
        } else {
          alert('Please pick a Poll to create from the drop down list.')
        }
    });

    $('#savePoll').on("click", function() {

        const updatePage = (type) => {
          $('#pollCreator').hide("fast");
          $(`#${type}Poll`).remove();
          $(`#pollsCreated`).append(`${type} <br>`)
        };

        const checkInput = (date) => {
         if (date === "") {
           alert("Please enter a deadline")
         } else {
           return true
         }
        };

        const getOptions = () => {
          let options = [];
          $( ".option" ).each(function() {
              let input = $( this ).find('input:text').val();
              options.push(input);
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

        const sendPollData = (data) => {
            if (checkInput(data.deadline)) {
              $.post("/polls/create", data);
              updatePage(data.type)
              $( ".option" ).each(function() {
                  $( this ).find('input:text').val("")
              });
            }
        };

        sendPollData(data)

    });


    const showPollsCreated = (polls) => {
        polls.forEach((poll) => {
            $('#pollsCreated').append(`${poll.type}`)
        })
    };
    let polls = await getExistingPolls();

    buildPollOptions(polls);
    showPollsCreated(polls);

    $('#guests').on("click", function() {
        let tripId = getUrlParams('tripId');
        $(location).attr('href', '/guests?tripId='+tripId)
        });

    var rowNum = 0;

    $(".addmore").on("click", function() {
          rowNum++;
          var $option = $('.option', '#pollOptions').last();   //.find("input").val("")
          var nextHtml = $option.clone();
          nextHtml.attr('id', 'option' + rowNum);
          nextHtml.find("input").val('');
          var hasRmBtn = $('.rmbtn', nextHtml).length > 0;
        if (!hasRmBtn) {
          var rm = "<button type='button' class='rmbtn'>Remove</button>"
          $('.removebtn', nextHtml).append(rm);
        }
          $option.after(nextHtml);
     });

    $("body").on("click", ".rmbtn", function() {
        $(this).parents('.option').remove();
    });

    $('#closePollCreator').click(function(event) {
        event.preventDefault();
        $('#pollCreator').hide("fast");
        $('#pollCreator').find('input:text').val('');
    });

    $("#skip").on("click", function() {
        let tripId = getUrlParams('tripId');
        $(location).attr('href', '/trip_home?id='+tripId)
    });
});
