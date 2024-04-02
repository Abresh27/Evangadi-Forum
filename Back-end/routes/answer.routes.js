const express = require("express");
const router = express.Router();
const { createAnswer, getAnswers } = require("../controller/answerController");

//Answer Routs
//Routs to add the answer
router.post("/:question_id/create", createAnswer);

//Rout to get the answer for the questions
router.get("/:question_id", getAnswers);

// Export the router middleware
module.exports = router;
