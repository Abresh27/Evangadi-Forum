import React from "react";
import { useState } from "react";
import { loginUser } from "../../API/api";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./landing.css";
import About from "../../components/About/About";
//Importing the framer-motion module to create the motion effect
import { motion } from "framer-motion";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function Login() {
  //State variables to set email and password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State variable to handle the error returned from the API server
  const [errorMsg, setErrorMsg] = useState(null);

  //State variable to handle the show and hide password event
  const [visibility, setVisibility] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //Function to handle the login event
  const navigate = useNavigate();
  // The useLocation hook returns an object containing information about the current URL location.
  const URLlocation = useLocation();
  //Accessing the page url the users were trying to access before being redirected to the sign-in page.
  const prevLocation = URLlocation.state?.from;

  async function handleLogin(e) {
    e.preventDefault();
    await loginUser({ email, password })
      //data is the response send from the server(back-end)
      .then((data) => {
        // console.log(data);
        setErrorMsg(null);
        //Stor the user's token in the local storage(browser) that sent from the login response
        localStorage.setItem("token", data.token);
        //If there's no previous location stored, the user will be redirected to the "/forum" page after successful sign-in.
        //And it replace the current entry in the history stack instead of adding a new entry.
        navigate(prevLocation || "/forum", { replace: true });
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  }
  return (
    <section className="login-container">
      <div className="login">
        <div className="login-section row">
          {/* wrap the login form section with the motion element to create the slide effect */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, x: -100 }}
            className="col-md-6"
          >
            <div className="login-form">
              <div className="join">Login to your account</div>
              <div className="have-account">
                Don't have an account?
                <Link to="/register" className="links">
                  Create a new account
                </Link>
              </div>
              <div className="error-txt">
                {errorMsg?.message && errorMsg.message}
              </div>
              <form action="" className="login-input" onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                {/* Condition to display the show and hide password icon */}
                {visibility ? (
                  <VisibilityOutlinedIcon
                    style={{
                      position: "absolute",
                      top: "34%",
                      right: "5%",
                      fontSize: "1.4rem",
                      cursor: "pointer",
                      color: "#fe8402",
                    }}
                    //onClick event handler function to handle the hide password event
                    onClick={() => {
                      setVisibility(false);
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    style={{
                      position: "absolute",
                      top: "34%",
                      right: "5%",
                      fontSize: "1.4rem",
                      cursor: "pointer",
                      opacity: "0.5",
                    }}
                    //onClick event handler function to handle the show password event
                    onClick={() => {
                      setVisibility(true);
                      setShowPassword(true);
                    }}
                  />
                )}
                <div className="forget">
                  <Link to="/#" className="links">
                    Forget your password?
                  </Link>
                </div>
                <Button type="" className="login-btn">
                  Log in
                </Button>
              </form>
            </div>
          </motion.div>

          <div className="about-section col-md-6">
            <About />
          </div>
        </div>
      </div>
    </section>
  );
}
