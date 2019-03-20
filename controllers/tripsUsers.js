const Trips = require("../models/lib/trips.js");
const Users = require("../models/lib/users.js");

exports.getTripUsers = async (req, res) => {
    let tripUsers = await Trips.getTripUsers(req.params.tripId);
    let usernames = await returnUserNames(tripUsers);
    res.send(usernames);
}


const returnUserNames = async(tripUsers) => {
    let tripUserIds = [];
    tripUsers.forEach(tripUser => { tripUserIds.push(tripUser.id) });
    return await Users.getNames(tripUserIds);
}
