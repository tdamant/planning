$(document).ready(function(){

  $('#logInButton').on("click", async (event) => {
    event.preventDefault();
    var urlParams = await new URLSearchParams(location.search);
    var fromUrl = await urlParams.get('fromUrl');
    if (fromUrl) {
        $('#logIn').append('<input type="hidden" name="fromUrl" value="' + fromUrl + '">')
    }
    $( "#logIn" ).submit();
  })

  $('#signUp').on("click", function() {
    $('#signInForm').fadeOut("fast");
    $('#signUpForm').delay("slow").fadeIn("fast");
    $('.whiteBox').css("left", "25%");
  });
  $('#signIn').on("click", function(){
    $('#signUpForm').fadeOut("fast");
    $('#signInForm').delay("slow").fadeIn("fast");
    $('.whiteBox').css("left", "50%");
  });


});
