$(document).ready(async function() {

    const saveComment = async(comment, announcement) => {
        $.post("/comments", {comment: comment, announcement: announcement, tripId: trip.id});
    };

    $('#commentButton1').on("click", function(event) {
        event.preventDefault();
        let comment = $("#comment1").val();
        let announcement = $("#announcement1").is(':checked');
        saveComment(comment, announcement);
        location.reload()
    });
     $('#commentButton2').on("click", function(event) {
         event.preventDefault();
        let comment = $("#comment2").val();
        let announcement = $("#announcement2").is(':checked');
        saveComment(comment, announcement);
        location.reload()
    });

    $("#addUsers").click(function() {
        $(location).attr('href', '/guests?tripId='+ trip.id);
    });

    const showCommentBox = async (id) => {
        $(`#${id}`).toggle();
    };

    $('#showCommentBox').on("click", function(event) {
        event.preventDefault();
        showCommentBox("addCommentDiv");
    });

    $('#showImportantCommentBox').on("click", function(event) {
        event.preventDefault();
        showCommentBox("addImportantCommentDiv");
    });

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

    const hideOrganiserFunctionality = async () => {
        if(isOrganiser === false) {
            $("#announcement2").hide();
            $("#announcement2-label").hide();
            $("#addUsers").hide();
            $("#showImportantCommentBox").hide();
        }
    };

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
            let year = comment.date.toString().substring(0, 4);
            let month = comment.date.toString().substring(5, 7);
            let day = comment.date.toString().substring(8, 10);
            let time = comment.date.toString().substring(11,16);
            $("#important-comment-list").append(`${comment.comment} --- ${time} ${day}-${month}-${year} <br>`)
        });
    };

    let trip = await loadTripData();
    let comments = await loadCommentData();
    let isOrganiser = await checkIfOrganiser();
    formatComments();
    hideOrganiserFunctionality();
});
