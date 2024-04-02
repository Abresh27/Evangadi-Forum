const express = require("express");
const router = express.Router();
const { createTable } = require("../controller/createTable");
//Route to create the tables in the database
router.get("/createtable", createTable);

module.exports = router;
