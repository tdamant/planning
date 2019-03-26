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

  setMailOptions(to, tripid) {
    this.mailOptions = {
      from: 'wing.it.hq@gmail.com',
      to: to,
      subject: 'Come fly with me! ;)',
      text: `You're invited: http://stormy-escarpment-39913/trips?id=${tripid}`
    }
  };

 sendMail(to, tripid) {
   this.setMailOptions(to, tripid);
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
