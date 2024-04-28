const jwt = require("jsonwebtoken");

//Middleware to check wether the token sent from the front-end is existed or valid to protect the back-end routs
async function authMiddleware(req, res, next) {
  //Extract the authorized user token sent from the the front-end with the response to send back with another request
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ msg: "Authentication token not existed" });
    next();
  }
  //Extract only the token part from the authHeader using split
  const token = authHeader.split(" ")[1];
  // console.log(token);
  try {
    //Destructure the signed payload and verify the token to pass it to only the authorized routes
    const { user_name, user_id } = jwt.verify(token, process.env.JWT_SECRET);
    // return res.status(200).json({ data });

    //Attaching the user data in the request object to send to the next route (checkUser function) or any other routs
    req.userData = { user_name, user_id };

    //Go to the authorized routes
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Authentication invalid" });
  }
}
module.exports = authMiddleware;
