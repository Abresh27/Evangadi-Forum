import React, { useState, useEffect, createContext } from "react";
import { getQuestions } from "../../API/api";

//Create context to make the question data sent from the get question request is available in the component needed
export const questionDataContext = createContext();
// Create a provider component to provide the value for all of the component(children) wrap by it
export const QuestionDataProvider = ({ children }) => {
  const [questionData, setQuestionData] = useState([]);
  //Get the token from local storage to get the user_id from the request object and to pass it to getQuestion data as a props
  const token = localStorage.getItem("token");
  //Use the useEffect hook to create a function to get list of questions from the database
  useEffect(() => {
    //Input of useEffect's callback function
    async function fetchQuestions() {
      //Use the function created in the API to get list of questions
      await getQuestions(token)
        .then((data) => setQuestionData(data))
        .catch((err) => console.log(err));
    }
    fetchQuestions();
  }, [token]);
  //    console.log(questionData);
  return (
    <questionDataContext.Provider value={{ questionData, setQuestionData }}>
      {children}
    </questionDataContext.Provider>
  );
};
