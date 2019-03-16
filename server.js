const express = require("express");
const app = express();
const port = process.env.PORT;


app.get("/", (req, res) => {
    res.send("Continous deployment!");
});

app.get("/sign-up", (req, res) => {
    res.send("Please sign up!");
});

app.listen(port, () => console.log(`Planning app listening here: ${port}!`));