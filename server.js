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
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "index.html"));
});

app.use(function(req, res, next) {
    if (!req.cookies.user){
      return res.redirect('/?fromUrl=' +req.originalUrl);
    } else {
      next()
    }
});

app.use("/trips", trips);
app.use("/users", users);
app.use("/stages", stages);
app.use("/trips_users", tripsUsers);



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

app.listen(port, () => console.log(`Planning app listening here: ${port}!`));
