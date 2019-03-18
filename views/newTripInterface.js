$(document).ready(function() {
    $('#submit').click(function(event) {
        event.preventDefault();
        $(location).attr('href', '/trip')
    })
})