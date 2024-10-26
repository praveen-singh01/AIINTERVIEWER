
import { POST_FEEDBACK ,CLEAR_FEEDBACK, LOADING_QUESTIONS, POST_QUESTION_ANSWER, POST_USER, RECEIVE_QUESTIONS } from "./actionType";
import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk'; // Import ThunkAction


interface LoadingQuestionsAction {
  type: typeof LOADING_QUESTIONS;
}

interface ReceiveQuestionsAction {
  type: typeof RECEIVE_QUESTIONS;
  payload: string[];
}


interface PostQuestionAnswerAction {
    type: typeof POST_QUESTION_ANSWER;
    payload: {
      question: string;
      answer: string;
    };
  }


export const loadingQuestions = () => ({
  type: LOADING_QUESTIONS as typeof LOADING_QUESTIONS,
});

// Define the action creator using Redux Thunk
// export const fetchQuestion = (): ThunkAction<void, {}, null, ReceiveQuestionsAction> => {
//   return async (dispatch: Dispatch) => {
//     dispatch({ type: LOADING_QUESTIONS });

//     try {
//       const res = await axios.get("http://localhost:8080/bot/node");
//       const paragraphs = res.data.split('\n');
//       const questionsArray = paragraphs.filter((paragraph: any) => /^\d+\.\s/.test(paragraph));
//       console.log(questionsArray);

//       // Dispatch the action with the payload
//       dispatch({
//         type: RECEIVE_QUESTIONS,
//         payload: questionsArray,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

export const fetchQuestion = (tech: string): ThunkAction<void, {}, null, ReceiveQuestionsAction> => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOADING_QUESTIONS });

    try {
      const res = await axios.get(`http://localhost:8080/bot/${tech}`);
      const paragraphs = res.data.split('\n');
      const questionsArray = paragraphs.filter((paragraph: any) => /^\d+\.\s/.test(paragraph));
      console.log(questionsArray);

      // Dispatch the action with the payload
      dispatch({
        type: RECEIVE_QUESTIONS,
        payload: questionsArray,
      });
    } catch (err) {
      console.error(err);
    }
  };
};
export const postQuestionAnswer = (question: string, answer: string): ThunkAction<void, {}, null, ReceiveQuestionsAction> => {
  return async (dispatch: Dispatch) => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
      console.log(token);

      // Make the POST request with Authorization header
      const response = await axios.post("http://localhost:8080/bot/answer", {
        question,
        answer,
      },{headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3Mjk5MDIwOTMsImV4cCI6MTczMDc0ODA5MywiZW1haWwiOiJwcmF2ZWVua3VtYXIxMTA5MEBnbWFpbC5jb20ifQ.SQBQy22Cm5XS3DrWHk-w_G3M45QHZwFa5VONeCD2PuU`, // Include JWT token in the header
      }});

      console.log(response.data);
      
      console.log(question, answer); // Check the values before sending

      dispatch({
        type: POST_QUESTION_ANSWER,
        payload: response.data, 
      });
     
    } catch (err) {
      console.error(err);
    }
  };
};


// export const postQuestionAnswer = (question: string, answer: string): ThunkAction<void, {}, null, ReceiveQuestionsAction> => {
//     return async (dispatch: Dispatch) => {
//       try {
//         const response = await axios.post("http://localhost:8080/bot/answer", {
//           question,
//           answer,
//         });
  
       
//         console.log(response.data);
//         console.log(question, answer); // Check the values before sending



//         dispatch({
//           type: POST_QUESTION_ANSWER,
//           payload: response.data, 
//         });
       
//       } catch (err) {
//         console.error(err);
//       }
//     };
//   };
  

  interface PostUserAction {
    type: typeof POST_USER;
    payload: {
      email: string;
    };
  }
  export const postUser = (email: string): ThunkAction<void, {}, null, PostUserAction> => {
    return async (dispatch: Dispatch) => {
      try {
        const token = localStorage.getItem("jwt");
      console.log(token);
        await axios.post("http://localhost:8080/bot/user", {
          email,
        },{
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in the header
          }
        });
      
  // console.log("ok done");
  

      } catch (err) {
        console.error(err);
      }
    };
  };

  export const postFeedback = (feedbackMessage: string): ThunkAction<Promise<boolean>, {}, null, any> => {
    return async (dispatch: Dispatch) => {
      try {
        const token = localStorage.getItem("jwToken"); // Retrieve token from localStorage
        console.log("Token:", token);
  
        // Prepare the feedback data
        const feedbackData = {
          Feedback: feedbackMessage,
        };
  
        // Make the POST request to the webhook
        const response = await axios.post("https://n8n.cubeone.in/webhook/mail", feedbackData, {
          headers: {
            "Content-Type": "text/plain", // Set the correct content type
          },
        });
  
        console.log("Feedback Response:", response.data);
  
        // Dispatch the action if needed
        dispatch({
          type: POST_FEEDBACK,
          payload: response.data,
        });
  
        // Return true if successful
        return true;
        
      } catch (err) {
        console.error("Feedback Error:", err);
        return false; // Return false on error
      }
    };
  };
  
  


  // export const postFeedback = (feedbackMessage: string): ThunkAction<void, {}, null, any> => {
  //   return async (dispatch: Dispatch) => {
  //     try {
  //       const token = localStorage.getItem("jwToken"); // Retrieve token from localStorage
  //       console.log(token);
  
  //       // Prepare the feedback data
  //       const feedbackData = {
  //         Feedback: feedbackMessage,
  //       };
  
  //       // Make the POST request to the webhook
  //       const response = await axios.post("https://n8n.cubeone.in/webhook/mail", feedbackData, {
  //         headers: {
  //           "Content-Type": "text/plain", // Set the correct content type
  //           // Include JWT token in the header if required
  //         },
  //       });
  
  //       console.log(response.data); // Log the response data
  
  //       // Dispatch the action if needed
  //       dispatch({
  //         type: POST_FEEDBACK,
  //         payload: response.data, // Adjust this based on your needs
  //       });
        
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  // };
  export const clearFeedback = () => ({
    type: CLEAR_FEEDBACK,
  });


