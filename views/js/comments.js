
$(document).ready(async function() {

    const showCommentBox = async (id) => {
        $(`#${id}`).toggle();
    };

    $('#commentButton').on("click", function(event) {
        event.preventDefault();
        let comment = $("#comment").val();
        let announcement = $("#announcement").is(':checked');
        $.post("/comments", {comment: comment, announcement: announcement, tripId: trip.id});
        location.reload()
    });

    $('#showCommentBox').on("click", function(event) {
        event.preventDefault();
        showCommentBox("addCommentDiv");
    });

    $('#showImportantCommentBox').on("click", function(event) {
        event.preventDefault();
        showCommentBox("addImportantCommentDiv");
    });

    const loadCommentData = async() =>{
        let commentsResponse = await fetch(`/comments/trips/${trip.id}`);
        let comments =  await commentsResponse.json();
        let importantComments = await comments.filter(comment=> { return comment.announcement === true });
        let otherComments = await comments.filter(comment=> { return comment.announcement != true });
        return {
            important: importantComments,
            other: otherComments
        };
    };

    const loadTripData = async() => {
        let tripId = location.search.substr(4);
        let tripResponse = await fetch(`/trips/${tripId}`);
        let trip = tripResponse.json();
        return trip
    };

    const checkIfOrganiser = async() => {
        let userId = await $.get("/whoami");
        let tripOrganiserId = trip.organiser;
        return userId == tripOrganiserId
    };

    const showImportantCheckbox = async () => {
        if(isOrganiser === false) {
            $("#announcement").hide();
            $("#announcement-label").hide();
        }
    };

    const formatComments = async() => {
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        };

        await asyncForEach(comments.other, async(comment) => {
            let userData = await $.get(`/users/${comment.user_id}`);
            $("#comment-list").append(`${comment.comment} --- ${userData.first_name}<br>`)
        });

        await asyncForEach(comments.important, async(comment) => {
            $("#important-comment-list").append(`${comment.comment} --- ${comment.date}<br>`)
        });
    };

    let trip = await loadTripData();
    let comments = await loadCommentData();

    let isOrganiser = await checkIfOrganiser();
    showImportantCheckbox();
    formatComments();


});

