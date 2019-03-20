$(document).ready(function() {
    var urlParams = new URLSearchParams(location.search);
    let fromUrl = urlParams.get('fromUrl');
    if (fromUrl) {
        $('#logIn').append('<input type="hidden" name="fromUrl" value="' + fromUrl + '">')
    }
});