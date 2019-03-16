const exampleModel = require("../models/example.js");

exports.getData = async (req, res) => {
    let data = await exampleModel.getData();
    res.send(data);
}