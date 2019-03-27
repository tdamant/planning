const commentsModel = require("../models/lib/comments.js");

exports.saveComment = async (req, res) => {
    let comment = req.body.comment;
    let announcement = req.body.announcement;
    let tripId = req.body.tripId;
    await commentsModel.saveComment(comment, req.cookies.user, tripId, announcement);
    res.send("success")
};

exports.getComments = async(req, res) => {
    let tripId = req.params.id
    let comments = await commentsModel.getCommentsByTrip(tripId);
    res.send(comments);
};
