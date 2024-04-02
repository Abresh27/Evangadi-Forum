const connection = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const {StatusCode} =require('http-status-code')

//Function to register a user in to our database
async function registerUser(req, res) {
  const { user_name, first_name, last_name, email, password } = req.body;
  // Condition to check all the required fields are inserted
  if (!user_name || !first_name || !last_name || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide all the required fields" });
  }
  try {
    //Condition to check if the email is used by another user
    const [userEmail] = await connection.execute(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );
    if (userEmail.length > 0) {
      return res.status(400).json({
        msg: "The email address is already associated with another user!",
      });
    }

    //Condition to check if the user name is used by another user
    const [userName] = await connection.execute(
      "SELECT user_name FROM users WHERE user_name = ?",
      [user_name]
    );
    // console.log(userName);
    // return res.json({ userName });
    if (userName.length > 0) {
      return res.status(400).json({
        msg: "The user name is already associated with another user!",
      });
    }

    //Condition to check if the password is at least 8 characters
    if (password.length < 8) {
      res
        .status(400)
        .json({ msg: "The password must contain at least 8 characters " });
    } else {
      //Password encryption
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //Insert all the data into the database using the connection created
      await connection.execute(
        "INSERT INTO users (user_name,first_name,last_name,email,password) VALUES (?,?,?,?,?)",
        [user_name, first_name, last_name, email, hashedPassword]
      );
      return res.status(201).json({ msg: "User is registered" });
    }
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
}

//Function to login a user in to our database
async function login(req, res) {
  const { email, password } = req.body;
  // Condition to check all the required fields are inserted
  if (!email || !password) {
    return { res }
      .status(400)
      .json({ msg: "please provide all the required fields" });
  }
  try {
    //Select and store the user data from the the database
    const [user] = await connection.execute(
      "SELECT user_id, user_name, password  FROM users WHERE email = ?",
      [email]
    );
    // console.log(user);
    //Condition to check if the user is existed using the email in the database
    if (user.length == 0) {
      return res.status(400).json({ msg: "Invalid email address" });
    }
    //Condition to check if the password is matched with the password in the database
    const isPasswordMatch = await bcrypt.compare(password, user[0].password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    } else {
      //Create signed json web token or User Authentication using jwt module to send back with the response
      const user_name = user[0].user_name;
      const user_id = user[0].user_id;
      const payload = { user_name: user_name, user_id: user_id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      //Send the created token if the user is logged in successfully
      return res.status(201).json({ msg: "User is logged in", token });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}

//Function to check the user is authorizer or not
async function checkUser(req, res) {
  // res.send("The user is checked");
  const user_name = req.userData.user_name;
  const user_id = req.userData.user_id;
  //Send the user validity response with the user information we want
  res.status(200).json({ msg: "valid user", user_name, user_id });
}

module.exports = { registerUser, login, checkUser };
