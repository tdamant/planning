$(document).ready(async function() {

   $("#nav, #close").on("click", function() {
       event.preventDefault();
       $("#sidenav").toggle("slow");
   })

});
