//Import the connection with the database
const connection = require("../config/dbConfig");
//Import the universal unique ID generator
const { v4: uuidv4 } = require("uuid");

//Function to add the questions in to the database
async function createQuestion(req, res) {
  const { title, description, tag } = req.body;
  //get the user id from the authMiddleWare request object
  const user_id = req.userData.user_id;
  //Create the question id using uuid module
  const question_id = uuidv4();
  //condition to check all the required fields are inserted
  if (!title || !description) {
    return res
      .status(400)
      .json({ msg: "Please provide all the required fields" });
  }
  //condition to check the length of the title is not exceeded 200 words
  // Remove non-letter characters
  const lettersOnly = title.replace(/[^a-zA-Z]/g, "");
  if (lettersOnly.length > 50) {
    return res
      .status(400)
      .json({ msg: "The title should non be exceeded 50 letters" });
  }
  //Insert all the values into the database using the created connection
  try {
    await connection.execute(
      "INSERT INTO questions (question_id,user_id,title,description,tag) VALUES (?,?,?,?,?)",
      [question_id, user_id, title, description, tag]
    );
    return res.status(201).json({ msg: "Question Created" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
}

//Function to get the list of questions from the database
async function getQuestions(req, res) {
  try {
    const [questionData] = await connection.execute(
      "SELECT questions.*, users.user_name FROM questions INNER JOIN users ON questions.user_id = users.user_id ORDER BY questions.id DESC"
    );
    if (questionData.length == 0) {
      return res.status(404).json({ msg: "No question found" });
    }
    res.status(200).json(questionData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = { createQuestion, getQuestions };

//extract the userId from the created context in the front-end userData
// const user_id = req.userData.user_id;
