//Import the connection with the database
const connection = require("../config/dbConfig");
//Function to add the answers in to the database
async function createAnswer(req, res) {
  const { answer } = req.body;
  //get the user id from the authMiddleWare request object
  const user_id = req.userData.user_id;
  //get the question_id from the request parameter
  const question_id = req.params.question_id;
  // console.log(questionid);
  //condition to check the required fields are inserted
  if (!answer) {
    return res.status(400).json({ msg: "Please provide the answer" });
  }
  //Insert all the values into the database using the created connection
  try {
    await connection.execute(
      "INSERT INTO answers (question_id,user_id,answer) VALUES (?,?,?)",
      [question_id, user_id, answer]
    );
    return res.status(201).json({ msg: "Answer Created" });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
}

//Function to get the answers from the database
async function getAnswers(req, res) {
  try {
    const [answerData] = await connection.execute(
      //An SQL query to select the necessary data from the database by passing the value of question_id using the request URL parameter
      "SELECT answers.*, users.user_name, questions.title, questions.description FROM answers INNER JOIN users ON answers.user_id = users.user_id INNER JOIN questions ON answers.question_id = questions.question_id WHERE answers.question_id = ? ORDER BY answers.answer_id DESC",
      [req.params.question_id]
    );
    // console.log(answerData);
    if (answerData.length == 0) {
      return res.status(404).json({ msg: "No answer found" });
    }
    res.status(200).json(answerData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = { createAnswer, getAnswers };
