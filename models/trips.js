const connection = require("../database/connection");


class Trips {
  static async saveToDB(tripName, description, attendee1, tripStart, tripEnd) {
        await connection.pool.query(`INSERT INTO trips (name, description, attendee1, startdate, enddate) VALUES ('${tripName}', '${description}', '${attendee1}', '${tripStart}', '${tripEnd}')`);
    };
}

module.exports = Trips;
