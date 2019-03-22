$(document).ready(function(){

  $('#logInButton').on("click", async (event) => {
    event.preventDefault();
    var originalUrl = await  getOriginalUrl();
    var userEmail = $("[name='email']").val();
    var userPassword = $("[name='password']").val()
    let response = $.post("/users/authenticate", {
      email: userEmail,
      password: userPassword,
      originalUrl: originalUrl},
      function (response) {
      response === "successfully authenticated" ? redirectUser(originalUrl) : alert('Incorrect email or password');
      });
  })

  $('#signUpButton').on("click", async (event) => {
    event.preventDefault();
    var originalUrl = await  getOriginalUrl();
    var userFirstName = $("[name='firstName']").val();
    var userLastName = $("[name='lastName']").val();
    var userEmail = $("[name='signInEmail']").val();
    var userPhone = $("[name='phoneNumber']").val();
    var userPassword = $("[name='signInPassword']").val()
    let response = $.post("/users/create", {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      phoneNumber: userPhone,
      password: userPassword,
      originalUrl: originalUrl},
      function (response) {
      response === "user already exists" ? alert('This email address is already in use.') : redirectUser(originalUrl);
      });
  })


  $('#signUp').on("click", function() {
    $('#logInDiv').fadeOut("fast");
    $('#signUpDiv').delay("slow").fadeIn("fast");
    $('.whiteBox').css("left", "25%");
  });

  $('#signIn').on("click", function(){
    $('#signUpDiv').fadeOut("fast");
    $('#logInDiv').delay("slow").fadeIn("fast");
    $('.whiteBox').css("left", "50%");
  });

});

getOriginalUrl = async () => {
  var urlParams = await new URLSearchParams(location.search);
  var fromUrl = await urlParams.get('fromUrl');
  return fromUrl;
};

redirectUser = function (originalUrl) {
  originalUrl ? $(location).attr('href', originalUrl) : $(location).attr('href', '/home')
};
