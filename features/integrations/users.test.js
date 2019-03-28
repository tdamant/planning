const userController = require("../../controllers/users.js");
const connection = require("../../database/connection.js");

describe("adding a user", () => {
    beforeAll(async () => {
        await connection.pool.query("truncate table users, votes, trips, stages, comments, polls, stages_users, trips_users restart identity");
        await userController.addUser({body: {
                email: 'email@email.com',
                firstName: 'Tom',
                lastName: 'D',
                phoneNumber: '000',
                password: 'password'
            }, connection: {encrypted: false}
        }, {getHeader: ()=> {},setHeader: {call: () => {}},
       send: ()=> {}
        })

    });
    it("user is added to db", async () => {
        let result = await connection.pool.query("select * from users");
        await expect(result.rows.length).toEqual(1);
        await expect(result.rows[0].first_name).toEqual("Tom");
        await expect(result.rows[0].last_name).toEqual("D");
        await expect(result.rows[0].phone_number).toEqual("000")
    })
});

describe("authenticating a user", async () => {
    it("authenticates if correct details", async () => {
        let responseSent;
        await userController.authLogin({body: {
                email: 'email@email.com',
                password: 'password'
            }, connection: {encrypted: false}
        }, {getHeader: ()=> {},setHeader: {call: () => {}},
            send: (response)=> {responseSent = response} });
        await expect(responseSent).toEqual("successfully authenticated")
    });

    it("doesn't authenticate if wrong email", async () => {
        let responseSent;
        await userController.authLogin({body: {
                email: 'wrong@email.com',
                password: 'password'
            }, connection: {encrypted: false}
        }, {getHeader: ()=> {},setHeader: {call: () => {}},
            send: (response)=> {responseSent = response} });
        await expect(responseSent).toEqual("failed to authenticate")
    });
    it("doesn't authenticate if wrong email", async () => {
        let responseSent;
        await userController.authLogin({body: {
                email: 'email@email.com',
                password: 'wrong'
            }, connection: {encrypted: false}
        }, {getHeader: ()=> {},setHeader: {call: () => {}},
            send: (response)=> {responseSent = response} });
        await expect(responseSent).toEqual("failed to authenticate")
    })
});