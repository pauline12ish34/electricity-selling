const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8082",
};

app.use(cors(corsOptions));


app.use(express.json()); 


app.use(
    express.urlencoded({ extended: true })
); 

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        // console.log("Connected to the database!");
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the best Electricity selling app." });
});

require("./app/routes/transaction.route")(app);

module.exports = app;
