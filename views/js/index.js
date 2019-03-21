$(document).ready(function(){

  $('#logInButton').on("click", async (event) => {
    event.preventDefault();
    var urlParams = await new URLSearchParams(location.search);
    var fromUrl = await urlParams.get('fromUrl');
    if (fromUrl) {
        $('#logIn').append('<input type="hidden" name="fromUrl" value="' + fromUrl + '">')
    }

    $( "#logIn" ).submit();

    let email = $("[name='email']").val()
    console.log(email);
    let password = $("[name='password']").val()
    console.log(password);

    await $.ajax({
      url: "/users/authenticate?email="+email+"&password="+password,
      method: "POST",
      success: function (result) {
        console.log(result) // redirect to home
      },
      error: (error) => {
        console.log("oh no") // pop up withj alert
        alert("Something went wrong.");
      }
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
