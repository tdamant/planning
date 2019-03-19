const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const path = require("path");
const trips = require("./routes/trips.js");
const users = require("./routes/users.js");
var cookieParser = require("cookie-parser");


const dotenv = require("dotenv");
dotenv.config();

app.use(cookieParser());


// app.all("/trip", (req, res) => {
//     console.log(req.cookies.user);
//     if (!req.cookies.user) {
//         res.redirect("/users/log_in")
//     }
//     else {
//         res.send("your signed in")
//     }
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "home.html"));
});

app.get("/new-trip", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "new-trip.html"));
});

app.get("/trip", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "trip.html"));
});

app.use("/trips", trips);
app.use("/users", users);

app.use(express.static(__dirname + '/views'));


app.listen(port, () => console.log(`Planning app listening here: ${port}!`));