const Trips = require("../models/lib/trips.js");
const Users = require("../models/lib/users.js");

exports.getTripUsers = async (req, res) => {
    let tripUsers = await Trips.getTripUsers(req.params.tripId);
    let users = await returnUsers(tripUsers);
    res.send(users);
}


const returnUsers = async(tripUsers) => {
    let tripUserIds = [];
    tripUsers.forEach(tripUser => { tripUserIds.push(tripUser.user_id) });
    return await Users.getUsers(tripUserIds);
}
