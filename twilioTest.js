const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.TOM_NUMBER)

// Twilio Credentials
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages.create(
    {
        to: process.env.TOM_NUMBER,
        from: process.env.TWILIO_NUMBER,
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    },
    (err, message) => {
        console.log(message.sid);
    }
);

