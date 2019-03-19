exports.sendText = (to, message, fakeClient) => {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    if(fakeClient) {
        var client = fakeClient
    }
    else {
        var client = require('twilio')(accountSid, authToken);
    }


    return client.messages.create(
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



