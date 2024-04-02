import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { postAnswer, getAnswers } from "../../API/api";
import "./answer.css";
import PersonIcon from "@mui/icons-material/Person";
//Import the useLocation to access the values in the URL parameter
import { useLocation } from "react-router-dom";

export default function Answer() {
  //State variable to hold the answer value from req.body
  const [answer, setAnswer] = useState("");
  //Extract the question_id from the URL parameter to use for both post and get request
  const { question_id } = useParams();
  // console.log(question_id);
  //Get the token from local storage to get the user_id from the request object
  const token = localStorage.getItem("token");

  //Variable to handle the error returned from the API server to post an answer
  const [error, setError] = useState(null);

  //Function to handle the form submit event
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postAnswer({ answer, question_id }, token);
      setError(null);
      setAnswer("");
    } catch (error) {
      setError(error);
    }
  }

  //Extract the title and description values from the URL parameter using useLocation
  const location = useLocation();
  // console.log(location);
  //Extract the questionTitle and questionDescription from the URL location state to display in the answer page
  const questionTitle = location.state ? location.state.questionTitle : "";
  const questionDescription = location.state
    ? location.state.questionDescription
    : "";

  //State variable to hold the answers data response from the get answers response as an array
  const [answersData, setAnswersData] = useState([]);
  //Use the useEffect hook to create a function to get the list of answers for a specific question from the database
  useEffect(() => {
    //Input of useEffect's callback function
    async function fetchAnswers() {
      //Use the function created in the API to get list of answers
      await getAnswers(question_id, token)
        .then((data) => setAnswersData(data))
        .catch((err) => console.log(err));
    }
    fetchAnswers();
  }, [token]);
  return (
    <section className="answer-container">
      <div className="question-text">
        <div className="question-txt">Question</div>
        {/* Display the question data passed through the sate URL parameter */}
        <div className="question-title">{questionTitle}</div>
        <div className="question-description">{questionDescription}</div>
      </div>
      <hr />
      <div className="ans-com-txt">Answer From The Community</div>
      <div className="answers-list">
        <hr />
        <div className="given-answer-section">
          {/* Map the answer data returned from the get answer response if there is answer in the DB */}

          {answersData.length > 0 ? (
            answersData?.map((answersData) => {
              // Return the mapped array values to display in the front-end
              return (
                <div>
                  <div
                    key={answersData.answer_id}
                    className="answer-list-container row"
                  >
                    <div className="col-md-2">
                      <PersonIcon className="person-icon" />
                      <div className="user-name">
                        By {answersData.user_name}
                      </div>
                    </div>
                    <div className="given-answer col-md-10">
                      {answersData.answer}
                    </div>

                    {/* Display the created date from the database */}
                    <div className="ans-given-date">
                      {new Date(answersData.ans_given_date).toLocaleString(
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
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <h1>No answer is given for this question</h1>
          )}
        </div>
      </div>
      <div className="answer-form-container">
        <div className="answer-top">Answer The Top Question</div>
        <div className="goto">
          <Link to="/forum" className="goto-text">
            Go to Question page
          </Link>
        </div>
        <form action="" className="answer-form" onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="Your Answer..."
            name="answer"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            value={answer}
          />
          <Button type="summit">Post Your Answer</Button>
        </form>
      </div>
    </section>
  );
}
