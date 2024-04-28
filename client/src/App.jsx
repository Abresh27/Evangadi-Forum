import React, { useEffect, useState, createContext, useContext } from "react";
import "./App.css";
import Register from "./pages/Landing/Register";
import Login from "./pages/Landing/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Forum from "./pages/Forum/Forum";
import { axiosInstance } from "./API/api";
import SharedLayout from "./pages/SharedLayout";
import Askquestion from "./pages/Question/Askquestion";
import Answer from "./pages/Answers/Answer";
//Importing Bootstrap CSS from bootstrap module
import "bootstrap/dist/css/bootstrap.min.css";
//Import the questionData context from the questionDataContext to access the question data values which is response from the getQuestion request
import { questionDataContext } from "./components/context/questionDataContext";
//Create context to make the user data sent from the checkUser request available globally
export const userContext = createContext();
function App() {
  //state value to update the user data sent from the get request response of checkuser route
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  //Get the token of the authorized user from local storage(browser) stored when the user is logged in.
  const token = localStorage.getItem("token");

  //Call back function for the useEffect hook to protect the front-end routs or check the user is authorized to access the pages
  async function checkUser() {
    try {
      //Send get request with the token information to check the user is authorized to access the pages
      //and destructure the response (Currently authenticated user data) sent from the checkUser request
      const { data } = await axiosInstance.get("/api/user/checkuser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // console.log(data);
      setUserData(data);
      // navigate()
      // console.log(userData);
    } catch (error) {
      //Navigate or force the user to log in if the back-end auth middleware send error because of ether the token dose'nt exist or invalid token
      // console.log(error.response, "test");
      navigate("/login");
    }
  }
  // useEffect to protect the front-end routs or check the user is authorized every time whenever the token is changed
  useEffect(() => {
    checkUser();
  }, [token]);
  //Destructure the questionData from the questionDataContext to use its value in the App component
  const { questionData } = useContext(questionDataContext);
  return (
    //Wrap all the components with the created context to make the user data values globally available
    <userContext.Provider value={{ userData, setUserData }}>
      <Routes>
        {/* Wrap all the route with <SharedLayout/> Route that share a commune components */}
        <Route element={<SharedLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forum/ask" element={<Askquestion />} />
          <Route path="/forum" element={<Forum />} />
          {/* passing the question_id as a path parameter */}
          <Route path={`/answer/:question_id`} element={<Answer />} />
        </Route>
      </Routes>
    </userContext.Provider>
  );
}
export default App;
