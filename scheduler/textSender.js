exports.sendText = (to, message) => {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages.create(
        {
            to: to,
            from: process.env.TWILIO_NUMBER,
            body: message,
        },
        (err, message) => {
            console.log(message.sid);
        }
    );
};



