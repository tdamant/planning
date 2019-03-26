$(document).ready(async function() {
    // comments.forEach(comment => {
    //     $("#comment-list").append(`${comment.body} --- ${comment.user}`)
    // });

    $('#commentButton').on("click", function(event) {
        event.preventDefault();
        let comment = $("#comment").val();
        $.post("/comments", {comment: comment});
        // document.refresh();
    });


    //
    // const loadComments = () =>{
    //     let commentsResponse = await fetch("comments");
    //     let comments = await commentsResponse.json();
    //     return {comments: comments}
    // };

    // loadComments();
});

