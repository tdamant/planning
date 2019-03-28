const User = require("../lib/users.js");
const connection = require("../../database/connection");

describe("users", () => {
    beforeAll( async() => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users, votes, comments, polls RESTART IDENTITY");
    });

    it("can add users", async () => {
        await User.addUser("Tom", "Damant", "tomdamant@hotmail.com", "07588468084",  "strongpassword");
        const result = await connection.pool.query("select * from users");
        let pwordCompare = await bcrypt.compare("strongpassword", result.rows[0].password );
        expect(result.rows.length).toEqual(1);
        expect(pwordCompare).toEqual(true);
        expect(result.rows[0].first_name).toEqual("Tom");
        expect(result.rows[0].id).toEqual(1);
    });

    it("can authenticate a user's credentials", async () => {
        let result = await User.authLogin('tomdamant@hotmail.com', 'strongpassword');
        expect(result.id).toEqual(1);
    });

    it("wont authenticate incorrect password", async() => {
        let result = await User.authLogin('tomdamant@hotmail.com', "wrongpassword");
        expect(result).toEqual(false)
    });

    it("wont authenticate incorrect email", async() => {
        let result = await User.authLogin('different@hotmail.com', "strongpassword");
        expect(result).toEqual(false)
    })
});