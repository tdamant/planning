const commentsModel = require("../models/lib/comments.js");

exports.saveComment = async (req, res) => {
    let comment = req.body.comment;
    await commentsModel.saveComment(comment, req.cookies.user);
    res.send("success")
};

exports.getComments = async(req, res) => {
    let comments = await commentsModel.getComments();
    res.send(comments);
};
