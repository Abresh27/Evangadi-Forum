const express = require("express");
const app = express();
const authMiddleware = require("./middleware/auth.Middleware");
// Import the dotenv module and call the config method to load the environment variables
require("dotenv").config();

//Import the cors module to pass the cors policy
const cors = require("cors");

//Import the create table routs
const tableRoutes = require("./routes/createtable.routes");

//Import the user routs
const userRoutes = require("./routes/user.routes");

//Import the question routs
const questionRoutes = require("./routes/question.routes");

//Import the answer routs
const answerRoutes = require("./routes/answer.routes");

//Middleware to pass the cors policy
app.use(cors());

//Middleware to send all the request as a json data
app.use(express.json());

//Route to check the back-end server
app.get("/", (req, res) => {
  res.send("Running");
});

//Create table Router middleware
app.use("/api/table", tableRoutes);

//User Router middleware
app.use("/api/user", userRoutes);

//Question Router middleware
app.use("/api/question", authMiddleware, questionRoutes);

//Answer Router middleware
app.use("/api/answer", authMiddleware, answerRoutes);

//Listener
const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`The server is running on ${PORT}`);
});
