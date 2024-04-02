import axios from "axios";
//Create Base URL using axios Option1
export const axiosInstance = axios.create(
  // URL for the back-end server is running locally
  {
    baseURL: "http://localhost:3000",

    // URL for the back-end server is running on the render.com web-server
    //baseURL: "",
  }
);

//Create Base URL using axios Option2
// axios.defaults.baseURL = "http://localhost:3000";

// A function (API) to send post request to create a new user
export async function registerUser(userInfo) {
  // console.log(userInfo);
  try {
    const res = await axiosInstance.post("/api/user/register", userInfo);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Registration failed");
  }
}

// A function or (API) to send post request to login a user
export async function loginUser(userInfo) {
  try {
    const res = await axiosInstance.post("/api/user/login", userInfo);
    // console.log(res);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Login failed");
  }
}

// A function(API) to send post request to create a question
export async function postQuestion(questionData, token) {
  //Send post request with the token information to insert the question data in to the database
  try {
    const res = await axiosInstance.post("/api/question/create", questionData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Question posting failed");
  }
}
// A function(API) to send get request to get list of questions from the database
export async function getQuestions(token) {
  try {
    const res = await axiosInstance.get("/api/question", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // console.log(res);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Question fetching failed");
  }
}

// A function to send post request to post an answer
export async function postAnswer(answerData, token) {
  try {
    const res = await axiosInstance.post(
      `/api/answer/${answerData.question_id}/create`,
      answerData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || " Question posting failed");
  }
}
// A function(API) to send get request to get list of answer for a specific question from the database
export async function getAnswers(question_id, token) {
  try {
    const res = await axiosInstance.get(`/api/answer/${question_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // console.log(res);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Answer fetching failed");
  }
}
