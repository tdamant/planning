const tripController = require("../../../controllers/trips.js");

const addTrip = async (tripName, description) => {
    await tripController.saveTripToDB(
        {cookies: {user: 1},
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

