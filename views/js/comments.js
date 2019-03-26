$(document).ready(async function() {
    const loadComments = async() =>{
        let commentsResponse = await fetch("/comments");
        return await commentsResponse.json();
    };

    let comments = await loadComments();

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    };

    await asyncForEach(comments, async(comment) => {
        let userData = await $.get(`/users/${comment.user_id}`);
        $("#comment-list").append(`${comment.comment} --- ${userData.first_name}<br>`)
    });

    $('#commentButton').on("click", function(event) {
        event.preventDefault();
        let comment = $("#comment").val();
        $.post("/comments", {comment: comment});
        location.reload()
    });
});

