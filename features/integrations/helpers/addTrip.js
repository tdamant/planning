const tripController = require("../../../controllers/trips.js");

const addTrip = async (tripName, description, user=1) => {
    await tripController.saveTripToDB(
        {cookies: {user: user},
            body: {
                tripName: tripName,
                description: description

            }, connection: {encrypted: false}
        }, {
            getHeader: () => {
            }, setHeader: {
                call: () => {
                }
            },
            send: () => {
            }
        });
};

module.exports = addTrip;

