const mysql = require("mysql2");
const dbConfig = {
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
};
// console.log(process.env.HOST);
//Create the connection with the database
const connection = mysql.createPool(dbConfig);
// console.log(connection);

//Test the connection
connection.execute("SELECT 'test'", (err, result) => {
  if (err) console.log(err.message);
  // console.log(result);
});

module.exports = connection.promise();
