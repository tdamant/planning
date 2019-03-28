$(document).ready(async function() {

   $("#nav").on("click", function(event) {
       event.preventDefault();
       $("#sidenav").toggle();
   })
});
