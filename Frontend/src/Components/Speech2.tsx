// import React, { useState, useEffect } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import Video from './Video';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { postFeedback,clearFeedback, fetchQuestion, postQuestionAnswer, postUser } from '../Redux/nodeReducer/action';
// import { useNavigate, useParams } from 'react-router-dom';
// import Header from './Header';
// import { BsFillMicFill, BsFillMicMuteFill, BsSoundwave } from 'react-icons/bs';
// import EndInterview from './EndInterview';

// const Speech2 = () => {
//   const [text, setText] = useState('');
//   const [interviewStart, setInterviewStarted] = useState(false);
//   const [currentQuestion, setCurrent] = useState(0);
//   const navigate = useNavigate();
//   let { tech = '' } = useParams();

//   const questions = useSelector((state: any) => state.questions);
//   const loading = useSelector((state: any) => state.loading);
//   const currentQuestionIndex = useSelector((state: any) => state.currentQuestionIndex);
//   let feedback = useSelector((state: any) => state.feedback);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch<any>(fetchQuestion(tech));
//   }, [dispatch, tech]);

//   const handleStartInterview = () => {
//     setInterviewStarted(true);
//     dispatch<any>(postUser("ad@gmail.com"));
//     dispatch(clearFeedback());
//     readQuestionAloud(); // Read the first question aloud when the interview starts
//   };

//   const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

//   const resetTranscript = () => {
//     SpeechRecognition.stopListening();
//     setText('');
//     SpeechRecognition.startListening();
//   };

//   const { listening, transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return null;
//   }

//   const handleNextQuestion = () => {
//     if (currentQuestion < questions.length) {
//       setCurrent(currentQuestion + 1);
//       resetTranscript();
//       readQuestionAloud(); // Read the next question aloud

//       dispatch(clearFeedback());
//     }
//   };

//   const handleFinish = () => {
//     navigate("/endinterview");
//   };

//   const submitQuestion = () => {
//     dispatch<any>(postQuestionAnswer(questions[currentQuestion], transcript));
//     console.log(questions[currentQuestion], transcript);
//   };

//   const submitFeedback = async () => {
//     const feedbackMessage = `Question: ${questions[currentQuestion]}\nAnswer: ${transcript}`;
//     const success = await dispatch<any>(postFeedback(feedbackMessage));
  
//     if (success) {
//       window.location.reload(); // Refresh the page if the feedback was successfully submitted
//     }
//   };
  
  

//   const readQuestionAloud = () => {
//     const utterance = new SpeechSynthesisUtterance(questions[currentQuestion]);
//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <>
//       <div className="flex">
//         <div className="w-1/2">
//           <Video />
//         </div>
//         <div className="w-1/2 p-4 border-cyan-800">
//           <div className="container mx-auto p-4 shadow-lg bg-teal-100 rounded">
//             {loading ? (
//               "Loading..."
//             ) : (
//               <button
//                 onClick={handleStartInterview}
//                 className={interviewStart ? "" : "bg-gray-500 text-white px-4 py-2 font-medium rounded-full hover:bg-gray-600"}
//               >
//                 {interviewStart ? "" : "Start interview"}
//               </button>
//             )}

//             {interviewStart && (
//               <>
//                 <h3 className="text-lg font-bold mb-4 text-neutral-900">{questions[currentQuestion]}</h3>
//                 <button onClick={readQuestionAloud} className="bg-gray-500 text-white px-4 py-1 mb-5 font-medium rounded-full hover:bg-gray-600">
//                   Repeat
//                 </button>
                
//                 {currentQuestion === questions.length - 1 ? (
//                   <button
//                     onClick={handleFinish}
//                     className="bg-gray-500 text-white px-4 py-1 mb-5 font-medium rounded-full hover:bg-gray-600"
//                   >
//                     Finish
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleNextQuestion}
//                     className="bg-gray-500 text-white px-4 py-1 mb-5 font-medium rounded-full hover:bg-gray-600"
//                   >
//                     Next
//                   </button>
//                 )}

//                 <div className="btn-style">
//                   <textarea
//                     value={transcript}
//                     onChange={(e) => setText(transcript)}
//                     className="w-full border rounded p-2 mb-4"
//                     placeholder="Transcript..."
//                   />
//                   <button
//                     onClick={startListening}
//                     className={listening ? 'bg-blue-800 text-white px-4 py-2 font-medium rounded-full mr-2 hover:bg-blue-600' : 'bg-blue-500 text-white px-4 py-2 font-medium rounded-full mr-2 hover:bg-blue-600'}
//                   >
//                     {listening ? <BsSoundwave /> : <BsFillMicFill />}
//                   </button>
//                   <button
//                     onClick={SpeechRecognition.stopListening}
//                     className="bg-red-500 text-white px-4 py-2 font-medium rounded-full mr-2 hover:bg-red-600"
//                   >
//                     <BsFillMicMuteFill />
//                   </button>
//                   <button
//                     onClick={submitQuestion}
//                     className="bg-sky-800 text-white px-4 py-1 font-medium rounded-full mr-2 hover:bg-red-600"
//                   >
//                     Submit
//                   </button>
//                   <button
//                     onClick={resetTranscript}
//                     className="bg-gray-500 text-white px-4 py-1 font-medium rounded-full hover:bg-gray-600"
//                   >
//                     Reset
//                   </button>
                

//                   <button
//   onClick={submitFeedback}
//   className="bg-green-500 text-white px-4 py-2 font-medium rounded-full hover:bg-gray-600"
// >
//   End Interview
// </button>




//                 </div>

//                 {feedback && (
//                   <div>
//                     <h1 className="text-blue-900"><b>Feedback :</b></h1>
//                     <p><b>Communication Skill:</b> {feedback.communicationSkill}</p>
//                     <p><b>Problem Solving Skill:</b> {feedback.problemSolving}</p>
//                     <p><b>Subject Expertise:</b> {feedback.subjectExperties}</p>
//                     <p><b>Feedback:</b> {feedback.feedBackMessage}</p>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Speech2;


import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Video from './Video';
import { useDispatch, useSelector } from 'react-redux';
import { postFeedback, clearFeedback, fetchQuestion, postQuestionAnswer, postUser } from '../Redux/nodeReducer/action';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillMicFill, BsFillMicMuteFill, BsSoundwave } from 'react-icons/bs';

const Speech2 = () => {
  const [text, setText] = useState('');
  const [interviewStart, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrent] = useState(0);
  const navigate = useNavigate();
  let { tech = '' } = useParams();

  const questions = useSelector((state: any) => state.questions);
  const loading = useSelector((state: any) => state.loading);
  const feedback = useSelector((state: any) => state.feedback);

  const dispatch = useDispatch();

  const loadQuestions = async () => {
    await dispatch<any>(fetchQuestion(tech));
  };

  // Function to handle starting the interview
  const handleStartInterview = async () => {
    setInterviewStarted(true);
    await dispatch<any>(postUser("ad@gmail.com"));
    dispatch(clearFeedback());
    loadQuestions();
    readQuestionAloud();
  };

  // Function to handle reading the question aloud
  const readQuestionAloud = () => {
    if (questions[currentQuestion]) {
      const utterance = new SpeechSynthesisUtterance(questions[currentQuestion]);
      speechSynthesis.speak(utterance);
    }
  };

  // Function to handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrent(currentQuestion + 1);
      resetTranscript();
      dispatch(clearFeedback());
      readQuestionAloud();
    }
  };

  const handleFinish = () => {
    navigate("/endinterview");
  };

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  const resetTranscript = () => {
    SpeechRecognition.stopListening();
    setText('');
    SpeechRecognition.startListening();
  };

  const { listening, transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const submitQuestion = () => {
    dispatch<any>(postQuestionAnswer(questions[currentQuestion], transcript));
    console.log(questions[currentQuestion], transcript);
  };

  const submitFeedback = async () => {
    const feedbackMessage = `Question: ${questions[currentQuestion]}\nAnswer: ${transcript}`;
    const success = await dispatch<any>(postFeedback(feedbackMessage));

    if (success) {
      window.location.reload(); // Refresh the page if the feedback was successfully submitted
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/2">
          <Video />
        </div>
        <div className="w-1/2 p-4 border-cyan-800">
          <div className="container mx-auto p-4 shadow-lg bg-teal-100 rounded">
            {loading ? (
              "Loading..."
            ) : (
              <button
                onClick={handleStartInterview}
                className={interviewStart ? "" : "bg-gray-500 text-white px-4 py-2 font-medium rounded-full hover:bg-gray-600"}
              >
                {interviewStart ? "" : "Start interview"}
              </button>
            )}

            {interviewStart && (
              <>
                <h3 className="text-lg font-bold mb-4 text-neutral-900">{questions[currentQuestion]}</h3>
                <button onClick={readQuestionAloud} className="bg-gray-500 text-white px-4 py-1 mb-5 font-medium rounded-full hover:bg-gray-600">
                  Repeat
                </button>
                
                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleFinish}
                    className="bg-gray-500 text-white px-4 py-1 mb-5 font-medium rounded-full hover:bg-gray-600"
                  >
                    Finish
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-gray-500 text-white px-4 py-1 mb-5 font-medium rounded-full hover:bg-gray-600"
                  >
                    Next
                  </button>
                )}

                <div className="btn-style">
                  <textarea
                    value={transcript}
                    onChange={(e) => setText(transcript)}
                    className="w-full border rounded p-2 mb-4"
                    placeholder="Transcript..."
                  />
                  <button
                    onClick={startListening}
                    className={listening ? 'bg-blue-800 text-white px-4 py-2 font-medium rounded-full mr-2 hover:bg-blue-600' : 'bg-blue-500 text-white px-4 py-2 font-medium rounded-full mr-2 hover:bg-blue-600'}
                  >
                    {listening ? <BsSoundwave /> : <BsFillMicFill />}
                  </button>
                  <button
                    onClick={SpeechRecognition.stopListening}
                    className="bg-red-500 text-white px-4 py-2 font-medium rounded-full mr-2 hover:bg-red-600"
                  >
                    <BsFillMicMuteFill />
                  </button>
                  <button
                    onClick={submitQuestion}
                    className="bg-sky-800 text-white px-4 py-1 font-medium rounded-full mr-2 hover:bg-red-600"
                  >
                    Submit
                  </button>
                  <button
                    onClick={resetTranscript}
                    className="bg-gray-500 text-white px-4 py-1 font-medium rounded-full hover:bg-gray-600"
                  >
                    Reset
                  </button>
                

                  <button
                    onClick={submitFeedback}
                    className="bg-green-500 text-white px-4 py-2 font-medium rounded-full hover:bg-gray-600"
                  >
                    End Interview
                  </button>

                </div>

                {feedback && (
                  <div>
                    <h1 className="text-blue-900"><b>Feedback :</b></h1>
                    <p><b>Communication Skill:</b> {feedback.communicationSkill}</p>
                    <p><b>Problem Solving Skill:</b> {feedback.problemSolving}</p>
                    <p><b>Subject Expertise:</b> {feedback.subjectExperties}</p>
                    <p><b>Feedback:</b> {feedback.feedBackMessage}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Speech2;
