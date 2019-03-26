const emailModel = require("../emailer/sendEmail.js");

exports.sendEmail = async (req, res) => {
  console.log(req.body)
  emailer = new emailModel
  await emailer.sendMail(req.body.to, req.body.tripId);
  console.log("done")

};
