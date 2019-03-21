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
    }

    static async findUsersOnStage(stageId){
        let result = await connection.pool.query(`SELECT user_id FROM stages_users WHERE stage_id = ${stageId}`);
        return result.rows
    }

}

module.exports = StagesUsers;
