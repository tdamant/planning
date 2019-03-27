const connection = require("../../database/connection");


class Comments {
    static async saveComment(comment, userId, tripId,  announcement) {
        await connection.pool.query(`INSERT INTO comments (comment, user_id, trip_id, announcement) VALUES ('${comment}', '${userId}', ${tripId}, ${announcement}) `);
    };

    static async getCommentsByTrip(tripId) {
        let result = await connection.pool.query(`SELECT * FROM comments WHERE trip_id = ${tripId} ORDER BY date DESC`);
        return result.rows
    }

}

module.exports = Comments;

