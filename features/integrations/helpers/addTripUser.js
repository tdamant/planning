const tripsUserController = require("../../../controllers/tripsUsers.js");

const addTripUser = async (tripId, user) => {
    let res = {getHeader: ()=> {},setHeader: {call: () => {}},
        send: (response)=> {responseSent = response}};
    await tripsUserController.createTripUser({body:{tripId: tripId,}, cookies:{user: user}}, res);
};

module.exports = addTripUser;

