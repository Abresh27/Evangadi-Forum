import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postQuestion } from "../../API/api";
import "./question.css";

export default function Askquestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  //Get the token from local storage to get the user_id from the request object
  const token = localStorage.getItem("token");
  //Variable to handle the error returned from the API server
  const [errorMsg, setErrorMsg] = useState(null);

  //Function to handle the form submit event
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postQuestion({ title, description, tag }, token);
      setErrorMsg(null);
      navigate("/forum");
    } catch (error) {
      setErrorMsg(error);
    }
  }
  return (
    <section className="question-container">
      <div className="question-section">
        <div className="steps-text">
          <div className="steps-title">Steps to write a good question</div>
          <ul>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe you problem in one more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <div className="question-form-container">
          <div className="ask-title">Ask a public question</div>
          <div className="goto">
            <Link to="/forum" className="goto-text">
              Go to Question page
            </Link>
          </div>
          {/* Display the error message in the front end if the response from the back-end server is returned error */}
          <div className="error-txt1">
            {errorMsg?.message && errorMsg.message}
          </div>
          <div className="question-form-section">
            <form action="" className="question-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
              <textarea
                type="text"
                placeholder="Question Description..."
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
              <input
                type="text"
                placeholder="Tag"
                name="tag"
                onChange={(e) => {
                  setTag(e.target.value);
                }}
                value={tag}
              />
              <Button type="summit">Post your Question</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
