import React from "react";
import { useState } from "react";
import { registerUser } from "../../API/api";
import { useNavigate, Link } from "react-router-dom";
import "./landing.css";
import About from "../../components/About/About";
import { Button } from "react-bootstrap";
//Importing the framer-motion module to create the motion effect
import { motion } from "framer-motion";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function Register() {
  const [user_name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");

  //Variable to handle the error returned from the API server
  const [errorMsg, setErrorMsg] = useState(null);

  //State variable to handle the show and hide password event
  const [visibility, setVisibility] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //Function to handle the form submit event
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser({ user_name, email, first_name, last_name, password });
      setErrorMsg(null);
      navigate("/login");
    } catch (error) {
      setErrorMsg(error);
      // console.log()
    }
  }
  return (
    <section className="signup-container">
      <div className="signup">
        <div className="signup-section row">
          {/* wrap the sign-up form section with the motion element to create the slide effect */}
          <motion.dev
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, x: -100 }}
            className="col-md-6"
          >
            <div className="sigup-form">
              <div className="join">Join the network</div>
              <div className="have-account">
                Already have an account?
                <Link to="/login" className="links">
                  Sign in
                </Link>
              </div>

              {/* Display the error message in the front end if the response from the back-end server is returned error */}
              <div className="error-txt">
                {errorMsg?.message && errorMsg.message}
              </div>

              <form action="" className="signup-input" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="name-input">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    required
                    value={first_name}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    required
                    value={last_name}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="user name"
                  name="user_name"
                  required
                  value={user_name}
                  onChange={(e) => {
                    setUsername(e.target.value);
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
                    className="eye-icon"
                    style={{
                      position: "absolute",
                      top: "57%",
                      right: "7%",
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
                      top: "57%",
                      right: "7%",
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
                <Button type="" className="signup-btn">
                  Agree and Join
                </Button>
              </form>
              <div className="agree">
                <div>
                  I agree to the <Link className="links">privacy policy</Link>{" "}
                  and
                  <Link className="links"> terms of services</Link>
                </div>
                <div>
                  <Link className="links" to="/login">
                    Already have an account?
                  </Link>
                </div>
              </div>
            </div>
          </motion.dev>

          <div className="about-section col-md-6">
            <About />
          </div>
        </div>
      </div>
    </section>
  );
}
