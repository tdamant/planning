$(document).ready(async function() {

   $("#nav, #close").on("click", function(event) {
       event.preventDefault();
       $("#sidenav").toggle();
   })

});
