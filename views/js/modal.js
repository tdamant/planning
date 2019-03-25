$(document).ready(async function(){
  $('#srchbar').keypress(async function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      let name = $('#srchbar').val();
      let tripsResults = await fetch(`/trips/name/${name}`);
      let results = await tripsResults.json();
      console.log(results);
      $('.searchResult').text("");
      results.forEach ((result) => {
        $('.searchResult').append(`<a href="/trips?id=${result.id}">${result.name}</a><br>`)
      });
      $('#srchbar').val("");
      $('.modal').css("display", "block");
    }

  });

  $('.close').on("click", function(event) {
    $('.modal').css("display", "none");
  });

  $(document).on("click", function(event) {
    if ($(event.target).is('.modal')) {
      $('.modal').css("display", "none");
    };
  });
});
