const dotenv = require('dotenv');
dotenv.config();
const textSender = require('./textSender.js');


textSender.sendText('+447588468084', "hey how's it going");
