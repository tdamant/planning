const User = require("../lib/users.js");
const connection = require("../../database/connection");

describe("users", () => {
    beforeEach( async() => {
        await connection.pool.query("TRUNCATE TABLE stages, users RESTART IDENTITY")
    });

    it("can add users", async () => {
        await User.addUser("Tom", "Damant", "tomdamant@hotmail.com", "07588468084",  "strongpassword");
        const result = await connection.pool.query("select * from users");
        expect(result.rows.length).toEqual(1);
        expect(result.rows[0].id).toEqual(1);
        expect(result.rows[0].first_name).toEqual("Tom");
        expect(result.rows[0].password).toEqual('strongpassword');
    });
});