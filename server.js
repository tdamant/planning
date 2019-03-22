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


app.all("/trip", (req, res) => { //have this for all pages they land on
    if (!req.cookies.user) {
        res.redirect("/?fromUrl=" +req.originalUrl)
    } else {
        res.sendFile(path.resolve(__dirname, "views", "tripHome.html")) // go to their original URL!
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

app.get("/polls", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "polls.html"));
});

app.get("/guests", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "guests.html"));
});

app.get("/organiserTripHome", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "organiserTripHome.html"));
});

app.get("/whoami", (req, res) => {
    res.send(req.cookies.user)
});

app.get("/newTrip", (req, res) => {
    if (!req.cookies.user) {
        res.redirect("/?fromUrl=" +req.originalUrl)
    } else {
        res.sendFile(path.resolve(__dirname, "views", "newTrip.html"));
    }
});

app.use("/trips", trips);
app.use("/users", users);
app.use("/stages", stages);
app.use("/trips_users", tripsUsers);

app.use(express.static(__dirname + '/views'));


app.listen(port, () => console.log(`Planning app listening here: ${port}!`));
