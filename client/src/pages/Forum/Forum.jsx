import React, { useContext } from "react";
//Import the context from the App.jsx to access the user data response from the checkUser get request
import { userContext } from "../../App";
//Import the questionData context from the questionData.context.js to access the question data values which is response from the getQuestion request
import { questionDataContext } from "../../components/context/questionDataContext";
import { Link } from "react-router-dom";
import "./forum.css";
import Avatar from "react-avatar";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export default function Forum() {
  //Destructure the userData from the userContext to use its value in the Forum component (front-end)
  const { userData } = useContext(userContext);
  //Destructure the questionData from the questionDataContext to use its value in the Forum component (front-end)
  const { questionData } = useContext(questionDataContext);
  return (
    <section>
      <div className="forum-container">
        <div className="welcome-section">
          <div className="ask-btn">
            <Link to="ask" className="ask-question">
              Ask Question
            </Link>
          </div>
          <div className="welcome">Welcome:{userData.user_name}</div>
        </div>
        <div className="question-text">Questions Asked by the Community</div>
        <div className="question-list-container">
          <hr />
          <div>
            {/* Map the question data returned from the get question response if there is question in the DB */}
            {questionData.length > 0 ? (
              questionData?.map((questionData) => {
                // Return the mapped array values to display in the front-end
                return (
                  <div key={questionData.id} className="question-lists">
                    {/* Include question_id,title & description as a parameter in the URL to retrieve it in the Answer component */}
                    <Link
                      to={{
                        pathname: `/answer/${questionData.question_id}`,
                        state: {
                          questionTitle: questionData.title,
                          questionDescription: questionData.description,
                        },
                      }}
                      className="question-list row"
                    >
                      <div className="col-11 row">
                        <div className="user-prof col-md-2">
                          {/* if the user icon is created by using Avatar module */}
                          {/* <Avatar
                            name={questionData.user_name}
                            size={100}
                            round={true}
                          /> */}

                          {/* If the user icon is created by using react material icon */}
                          <PersonIcon className="person-icon" />
                          <div className="user-name">
                            By {questionData.user_name}
                          </div>
                        </div>
                        <div className="question-asked col-md-10">
                          {questionData.title.endsWith("?")
                            ? questionData.title
                            : questionData.title + "?"}
                        </div>
                      </div>
                      <ArrowForwardIosIcon className="arrow-icon col-1" />
                    </Link>

                    {/* Display the created date from the database */}
                    <div className="created-date">
                      {new Date(questionData.created_date).toLocaleString(
                        "en-US",
                        {
                          // minute: "numeric",
                          // hour: "numeric",
                          // weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </div>
                    <hr />
                  </div>
                );
              })
            ) : (
              <h1>No questions to display</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
