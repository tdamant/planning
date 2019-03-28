const connection = require("../../database/connection");
const Stage = require("./stage");
const User = require("./users");

class StagesUsers {

    static async addUserToStages(tripId, userId) {
        let stages = await Stage.getStagesByTripId(tripId);
        await stages.forEach(async stage => {
            await connection.pool.query(`INSERT INTO stages_users (stage_id, user_id) VALUES ('${stage.id}', '${userId}') returning id`)
        });
    }
    static async addStageToUsers(stageId, tripId) {
        let users = await User.getUsersByTripId(tripId);
        await users.forEach(async user => {
            await connection.pool.query(`INSERT INTO stages_users (stage_id, user_id) VALUES ('${stageId}', '${user.user_id}') returning id`)
        });
    };

    static async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    };

    static async deleteUsersFromStages(stages, userId) {
        await StagesUsers.asyncForEach(stages, async (stage) => {
            await StagesUsers.deleteFromStage(stage.id, userId)
        })

    };

    static async deleteFromStage(stageId, userId) {
        await connection.pool.query(`DELETE FROM stages_users WHERE stage_id = ${stageId} AND user_id = ${userId}`)
    };

    static async findUsersOnStage(stageId){
        let result = await connection.pool.query(`SELECT user_id FROM stages_users WHERE stage_id = ${stageId}`);
            return result.rows
        }
}

module.exports = StagesUsers;
