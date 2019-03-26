const connection = require("../../database/connection");


class Comments {
    static async saveComment(comment, userId) {
        let tripId = await connection.pool.query(`INSERT INTO comments (comment, user_id) VALUES ('${comment}', '${userId}') `);
        return tripId.rows[0]
    };

    static async getComments() {
        let result = await connection.pool.query(`SELECT * FROM comments`);
        return result.rows
    }

}

module.exports = Comments;

