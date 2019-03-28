const pollController = require("../../../controllers/polls.js");


const addPoll = async (type, deadline, tripId, options) => {
    let res = {getHeader: ()=> {},setHeader: {call: () => {}},
        send: (response)=> {responseSent = response}};
    await pollController.savePollToDB({body:{
            type: type,
            deadline: deadline,
            tripId: tripId,
            options: options
    }}, res);
};

module.exports = addPoll;

