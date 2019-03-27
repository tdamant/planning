const connection = require("../../database/connection");


class Comments {
    static async saveComment(comment, userId, announcement) {
        await connection.pool.query(`INSERT INTO comments (comment, user_id, announcement) VALUES ('${comment}', '${userId}', ${announcement}) `);
    };

    static async getComments() {
        let result = await connection.pool.query(`SELECT * FROM comments ORDER BY date DESC`);
        return result.rows
    }

}

module.exports = Comments;

