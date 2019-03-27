const userController = require("../../../controllers/users.js");

const addUser = async(email, firstName, lastName, phoneNumber, password) => {
    await userController.addUser({
        body: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            password: password
        }, connection: {encrypted: false}
    }, {
        getHeader: () => {
        }, setHeader: {
            call: () => {
            }
        },
        send: () => {
        }
    })

};

module.exports = addUser;
