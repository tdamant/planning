const nodemailer = require('nodemailer');

class SendMail {
  constructor() {
    this.mailOptions = "";
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      }
    });
  }

  setMailOptions(to, tripid, organiser) {
    let upper = organiser.charAt(0).toUpperCase() + organiser.substring(1);
    this.mailOptions = {
      from: 'wing.it.hq@gmail.com',
      to: to,
      subject: 'Come fly with me! ;)',
      html: `<h3>Hi there,</h3><p>${upper} has invited you to an event on Wing.
      <br>Check it out at: http://stormy-escarpment-39913.herokuapp.com/trip_home?id=${tripid}<p><br>
      <p><i>Wing Team</i></p>`
    }
  };

 sendMail(to, tripid, organiser) {
   this.setMailOptions(to, tripid, organiser);
    this.transporter.sendMail(this.mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

module.exports = SendMail;
//
