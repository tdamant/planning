const connection = require("../../database/connection");

class Poll {

    static async savePollToDB(type, options, deadline, tripId) {
      connection.pool.query(`INSERT INTO polls (type, options, deadline, trip_id) VALUES ('${type}', '${options}', '${deadline}', '${tripId}')`)
    }

    static async getPolls(tripId) {
      let result = await connection.pool.query(`SELECT * FROM polls WHERE trip_id = '${tripId}'`)
      return result.rows
    }
    static async saveVotes(pollId, userId, optionIds) {
      let splitOptionIds = await optionIds.split(',')
      splitOptionIds.forEach((vote) => {
        connection.pool.query(`INSERT INTO votes (poll_id, user_id, option_id) VALUES ('${pollId}', '${userId}', '${vote}')`);
      })
    }

}

module.exports = Poll;
