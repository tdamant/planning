const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require("path");
const example = require("./routes/example.js");


app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "home.html"));
});

app.get("/sign-up", (req, res) => {
    res.send("Please sign up!");
});
app.get("/new-trip", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "new-trip.html"));
});

app.get("/trip", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "trip.html"));
});

app.use('/example', example);

app.use(express.static(__dirname + '/views'));


app.listen(port, () => console.log(`Planning app listening here: ${port}!`));