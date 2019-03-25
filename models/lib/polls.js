const connection = require("../../database/connection");

class Poll {

    static async savePollToDB(type, options, deadline, tripId) {
      connection.pool.query(`INSERT INTO polls (type, options, deadline, trip_id) VALUES ('${type}', '${options}', '${deadline}', '${tripId}')`)
    }

    // function to get polls out and turn the options back into an array.

}

module.exports = Poll;
