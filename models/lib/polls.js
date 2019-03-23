const connection = require("../../database/connection");

class Poll {

    // constructor(id, name, content, dueDate ,eventId) {
    //
    // };

    static async savePollToDB(type, options, deadline, tripId) {
      let parsedoptions = JSON.parse(options)
      connection.pool.query(`INSERT INTO polls (type, options, deadline, trip_id) VALUES ('${type}', ARRAY[${parsedoptions}], '${deadline}', '${tripId}')`)
    }

}

module.exports = Poll;
