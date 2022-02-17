module.exports = (app) => {
    const transactions = require("../controllers/transact.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", transactions.create);

    // Retrieve all Tutorials
    router.get("/", transactions.findAll);

   
    // Retrieve a single Tutorial with id
    router.get("/:id", transactions.findOne);

    
    app.use("/api/transactions", router);
};