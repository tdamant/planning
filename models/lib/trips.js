const connection = require("../../database/connection");


class Trips {
  static async saveToDB(tripName, description, organiserID) {
      let tripId = await connection.pool.query(`INSERT INTO trips (name, description, organiser) VALUES ('${tripName}', '${description}', '${organiserID}') returning id`);
      return tripId.rows[0]
  };

  static async getById(id) {
      let data = await connection.pool.query(`SELECT * FROM trips WHERE id = '${id}'`);
      return data.rows[0]
  };

  static async getByName(name) {
    let data = await connection.pool.query(`SELECT * FROM trips WHERE name LIKE '%${name}%'`);
    return data.rows
  };

  static async getTripUsers(tripId) {
      let result = await connection.pool.query(`SELECT * FROM trips_users where trip_id = '${tripId}'`);
      return result.rows
  }

  static async addUserToTrip(tripId, userId) {
      await connection.pool.query(`INSERT into trips_users (trip_id, user_id) VALUES ('${tripId}', '${userId}')`);
  }

  static async removeUserFromTrip(tripId, userId) {
    await connection.pool.query(`DELETE FROM trips_users WHERE trip_id = ${tripId} AND user_id = ${userId}`);
      return "done"
  }
}

module.exports = Trips;


//add stage to trip
