const db = require("../models");
const Transaction = db.transactions;

// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if (!req.body.money&& !req.body.meterNumber) {
        res.status(400).send({ message: "meter or money can not be empty!" });
        return;
    }

    // Save Tutorial in the database
    Transaction.create({
        id: req.body.id,
        money: req.body.money,
        meter: req.body.meter })
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the meter",
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

    Transaction.find()
        .then((data) => {
            if (data.length > 0) {
                res.status(200).send(data);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch((err) => {
            // console.log('error, '+JSON.stringify(err))
            res.status(500).json({
                message:
                    err.message ||
                    "Some error occurred while retrieving tutorials.",
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Transaction.findById(id)
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found",
                });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};
