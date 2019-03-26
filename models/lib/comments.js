const connection = require("../../database/connection");


class Comments {
    static async saveComment(comment, userId) {
        await connection.pool.query(`INSERT INTO comments (comment, user_id) VALUES ('${comment}', '${userId}') `);
    };

    static async getComments() {
        let result = await connection.pool.query(`SELECT * FROM comments ORDER BY date DESC`);
        return result.rows
    }

}

module.exports = Comments;

