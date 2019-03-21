
$(document).ready(function(){

  $('#logInButton').on("click", async (event) => {
    event.preventDefault();
    var originalUrl = await  getOriginalUrl();
    var userEmail = $("[name='email']").val();
    var userPassword = $("[name='password']").val()
    let response = $.post("/users/authenticate", {email: userEmail, password: userPassword, originalUrl: originalUrl}, function(response){
      console.log(response);
      response === "successfully authenticated" ? redirectUser(originalUrl) : alert('Incorrect email or password');
      });
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

getOriginalUrl = async () => {
  var urlParams = await new URLSearchParams(location.search);
  var fromUrl = await urlParams.get('fromUrl');
  return fromUrl;
};

redirectUser = function (originalUrl) {
  originalUrl ? $(location).attr('href', originalUrl) : $(location).attr('href', '/new-trip')
};
