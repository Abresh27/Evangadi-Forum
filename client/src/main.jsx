import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//Importing Bootstrap CSS from bootstrap module
import "bootstrap/dist/css/bootstrap.min.css";
//Import the QuestionDataProvider from the questionDataContext to pass the values by wrapping the components that use this value
import { QuestionDataProvider } from "./components/context/questionDataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Wrap the components with the QuestionDataProvider context to make the question data values available */}
      <QuestionDataProvider>
        <App />
      </QuestionDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
