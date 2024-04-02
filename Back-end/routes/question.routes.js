const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestions,
} = require("../controller/questionController");

//Question Routs
//Routs to add the question
router.post("/create", createQuestion);

//Rout to get all the questions
router.get("", getQuestions);

module.exports = router;
