const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.Middleware");
const {
  registerUser,
  login,
  checkUser,
} = require("../controller/userController");

//User routs
//Route to register the user
router.post("/register", registerUser);

//Route to login the user
router.post("/login", login);

//Route to check the user
router.get("/checkuser", authMiddleware, checkUser);

module.exports = router;
