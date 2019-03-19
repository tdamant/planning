const connection = require("../../database/connection");

class User {
    static async addUser(firstName, lastName, email, phoneNumber, password) {
        await connection.pool.query(`INSERT INTO users (first_name, last_name, email, phone_number, password) 
        VALUES ('${firstName}', '${lastName}', '${email}', '${phoneNumber}', '${password}')`)
    }

    static async checkUser(email, password) {
        let result = await connection.pool.query(`SELECT password FROM users WHERE email = '${email}'`)
        return result.rows.length === 0 ? false : result.rows[0].password === password
    }
}

module.exports = User;