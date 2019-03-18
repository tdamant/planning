const connection = require("../database/connection");


class Example {
    static async getData() {
        let result = await connection.pool.query("select * from examples");
        return result.rows
    }
}

module.exports = Example;

