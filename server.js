const express = require("express");
const app = express();
const port = process.env.PORT;
const example = require("./routes/example.js");
const dotenv = require('dotenv');
dotenv.config();


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/sign-up", (req, res) => {
    res.send("Please sign up!");
});

app.use('/example', example);

app.use(express.static(__dirname + '/views'));

app.listen(port, () => console.log(`Planning app listening here: ${port}!`));





