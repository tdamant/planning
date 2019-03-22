const connection = require("../../database/connection");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {

  static async authLogin(email, password) {
      let result = await connection.pool.query(`SELECT * FROM users WHERE email = '${email}'`);
      if (result.rows.length === 0) {
        return false
      } else {
        let res = await bcrypt.compare(password, result.rows[0].password)
        return res ? result.rows[0] : false
      };
  };

  static async authSignUp(email) {
      let result = await connection.pool.query(`SELECT * FROM users WHERE email = '${email}'`);
      return result.rows.length === 0 ? false : true;
  };

  static async addUser(firstName, lastName, email, phoneNumber, password) {
      let hashed = await bcrypt.hash(password, saltRounds);
      let response = await connection.pool.query(`INSERT INTO users (first_name, last_name, email, phone_number, password)
      VALUES ('${firstName}', '${lastName}', '${email}', '${phoneNumber}', '${hashed}') returning id`)
      return response.rows[0]
  };

  static async getUsers(idArray) {
      let ids = idArray.join(",");
      let results = await connection.pool.query(`SELECT id, first_name, last_name, phone_number FROM users WHERE id in (${ids}) `);
      return results.rows
  };

  static async getUsersByTripId(tripId) {
      let results = await connection.pool.query(`SELECT user_id FROM trips_users WHERE trip_id = '${tripId}' `);
      return results.rows
  };

}

module.exports = User;
