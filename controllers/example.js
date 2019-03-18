const exampleModel = require("../models/lib/example.js");

exports.getData = async (req, res) => {
    let data = await exampleModel.getData();
    res.send(data);
}