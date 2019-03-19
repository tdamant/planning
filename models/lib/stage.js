const connection = require("../../database/connection");

class Stage {

    constructor(id, name, content, dueDate ,eventId) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.dueDate = dueDate;
        this.eventId = eventId
    };

    static async addStage(name, content, dueDate, eventId) {
        await connection.pool.query(`INSERT INTO stages (name, content, due_date, event_id) VALUES ('${name}', '${content}', '${dueDate}', '${eventId}') `)
    }

    static async getStages(date) {
        if (date) {
            var stages = await connection.pool.query(`SELECT * FROM stages WHERE due_date = '${date}'`);
        } else {
            var stages = await connection.pool.query('SELECT * FROM stages');
        };
        let stagesArray = [];
        stages.rows.forEach((stage) => {
            stagesArray.push(new Stage(stage.id, stage.name, stage.content, stage.due_date, stage.event_id))
        });
        return stagesArray;
    };

    static async getStagesByTripId(tripId) {
        var stages = await connection.pool.query(`SELECT * FROM stages WHERE event_id =${tripId}`);
        let stagesArray = [];
        stages.rows.forEach((stage) => {
            stagesArray.push(new Stage(stage.id, stage.name, stage.content, stage.due_date, stage.event_id))
        });
        return stagesArray;
    };
}

module.exports = Stage;
