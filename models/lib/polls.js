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
        const asyncForEach = async (array, callback) => {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        };
      let splitOptionIds = optionIds.split(',');
      await asyncForEach(splitOptionIds, (vote) => {
        connection.pool.query(`INSERT INTO votes (poll_id, user_id, option_id) VALUES ('${pollId}', '${userId}', '${vote}')`);
      });
      return "done"
    };

    static async getVotes(pollId) {
        let result = await connection.pool.query(`select * from votes where poll_id = '${pollId}'`);
        return result.rows
    }

}

module.exports = Poll;
