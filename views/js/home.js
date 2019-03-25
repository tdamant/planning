$(document).ready(async function(){
  const fetchName = async () => {
  let currentUser = await fetch ("/users");
  let currentUserId = await currentUser.json();
  return currentUserId[0].first_name;
  }

  let name = await fetchName();

  $("#greet_user").text(`${name}`);

  $('#srchbar').keypress(async function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      let name = $('#srchbar').val();
      let tripsResults = await fetch(`/trips/name/${name}`);
      let results = await tripsResults.json();
      console.log(results);
      results.forEach ((result) => {
        $('.searchResult').append(`<a href="/trips?id=${result.id}">${result.name}</a><br>`)
      });
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
