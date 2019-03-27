$(document).ready(async function() {
    $('#commentButton').on("click", function(event) {
        event.preventDefault();
        let comment = $("#comment").val();
        let announcement = $("#announcement").is(':checked');
        $.post("/comments", {comment: comment, announcement: announcement});
        location.reload()
    });

    const loadCommentData = async() =>{
        let commentsResponse = await fetch("/comments");
        let comments =  await commentsResponse.json();
        let importantComments = await comments.filter(comment=> { return comment.announcement === true });
        let otherComments = await comments.filter(comment=> { return comment.announcement != true });
        return {
            important: importantComments,
            other: otherComments
        };
    };

    const checkIfOrganiser = async() => {
        let userId = await $.get("/whoami");
        let tripId = location.search.substr(4);
        let tripResponse = await fetch(`/trips/${tripId}`);
        let trip = await tripResponse.json();
        let tripOrganiserId = trip.organiser;
        return userId == tripOrganiserId
    };

    const showImportantCheckbox = async () => {
        console.log(isOrganiser);
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
            let userData = await $.get(`/users/${comment.user_id}`);
            $("#important-comment-list").append(`${comment.comment} --- ${userData.first_name}<br>`)
        });
    };


    let comments = await loadCommentData();
    let isOrganiser = await checkIfOrganiser();
    showImportantCheckbox();
    formatComments();

});
