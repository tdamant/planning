const express = require("express");
const app = express();
const port = process.env.PORT;


app.get("/", (req, res) => {
    res.send("Continous deployment!");
});

app.listen(port, () => console.log(`Planning app listening here: ${port}!`));