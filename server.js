const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const path = require("path");
const trips = require("./routes/trips.js");
const users = require("./routes/users.js");
const tripsUsers = require("./routes/tripsUsers.js");
var cookieParser = require("cookie-parser");
const stages = require("./routes/stages.js");

const dotenv = require("dotenv");
dotenv.config();

app.use(cookieParser());


app.all("/trip", (req, res) => {
    if (!req.cookies.user) {
        res.redirect("/?fromUrl=" +req.originalUrl)
    } else {
        res.sendFile(path.resolve(__dirname, "views", "trip.html")) // go to their original URL!
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "index.html"));
});

app.get("/home", (req, res) => {
    if (!req.cookies.user) {
        res.redirect("/?fromUrl=" +req.originalUrl)
    } else {
        res.sendFile(path.resolve(__dirname, "views", "home.html"));
    }
});

app.get("/whoami", (req, res) => {
    res.send(req.cookies.user)
});

app.get("/new-trip", (req, res) => {
    if (!req.cookies.user) {
        res.redirect("/?fromUrl=" +req.originalUrl)
    } else {
        res.sendFile(path.resolve(__dirname, "views", "new-trip.html"));
    }
});

app.use("/trips", trips);
app.use("/users", users);
app.use("/stages", stages);
app.use("/trips_users", tripsUsers);

app.use(express.static(__dirname + '/views'));


app.listen(port, () => console.log(`Planning app listening here: ${port}!`));
