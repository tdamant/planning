const connection = require("../database/connection");


class Trips {
  static async saveToDB(tripName, description) {
        await connection.pool.query(`INSERT INTO trips (name, description) VALUES ('${tripName}', '${description}')`);
    };

  static async getByName(name) {
        let data = await connection.pool.query(`SELECT * FROM trips WHERE name = '${name}'`);
        return data.rows[0]
    };
}

module.exports = Trips;
