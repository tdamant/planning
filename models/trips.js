const connection = require("../database/connection");


class Trips {
  static async saveToDB(tripName, description, organiserID) {
        await connection.pool.query(`INSERT INTO trips (name, description, organiser) VALUES ('${tripName}', '${description}', '${organiserID}')`);
    };

  static async getByName(name) {
        let data = await connection.pool.query(`SELECT * FROM trips WHERE name = '${name}'`);
        return data.rows[0]
    };
}

module.exports = Trips;
