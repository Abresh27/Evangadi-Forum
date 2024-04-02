//Import the database connection from the dbConfig file
const connection = require("../config/dbConfig");

//Function to create the table in our database
async function createTable(req, res) {
  let createUserTable = `CREATE TABLE if not exists users (
              user_id INT(20) auto_increment,
              user_name VARCHAR(20) not null,
              first_name VARCHAR(20) not null,
              last_name VARCHAR(20) not null,
              email VARCHAR(40) not null,
              password VARCHAR(100) not null, 
              PRIMARY KEY (user_id)
          )`;
  let createQuestionTable = `CREATE TABLE if not exists questions (
              id int(20) auto_increment,
              question_id VARCHAR(100) not null UNIQUE,
              user_id INT(20),
              title VARCHAR(50) not null,
              description VARCHAR(200) not null,
              tag VARCHAR(20),
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              PRIMARY KEY (id, question_id),
              FOREIGN KEY (user_id) REFERENCES users (user_id)
          )`;
  let createAnswerTable = `CREATE TABLE if not exists answers (
              answer_id INT(20) auto_increment,
              user_id INT(20),
              question_id VARCHAR(100) not null,
              answer VARCHAR(200) not null,
              ans_given_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              PRIMARY KEY (answer_id),
              FOREIGN KEY (user_id) REFERENCES users (user_id),
              FOREIGN KEY (question_id) REFERENCES questions (question_id)
          )`;
  //Executing the query we wrote above
  try {
    const userTable = await connection.execute(createUserTable);
    console.log(`User table created`);
  } catch (err) {
    console.log(`Error found in creating User table, Error :${err}`);
  }
  try {
    const questionTable = await connection.execute(createQuestionTable);
    console.log(`Question table created`);
  } catch (err) {
    console.log(`Error found in creating Question table, Error :${err}`);
  }
  try {
    const answerTable = await connection.execute(createAnswerTable);
    console.log(`Answer table created`);
    res.send(`All tables created`);
  } catch (err) {
    console.log(`Error found in creating Answer table}, Error :${err}`);
    res.status(500).send("Error creating tables");
  }
}

module.exports = { createTable };
