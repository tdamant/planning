const connection = require("../../database/connection");

class User {
    static async addUser(firstName, lastName, email, phoneNumber, password) {
        await connection.pool.query(`INSERT INTO users (first_name, last_name, email, phone_number, password) 
        VALUES ('${firstName}', '${lastName}', '${email}', '${phoneNumber}', '${password}')`)
    }
}

module.exports = User;