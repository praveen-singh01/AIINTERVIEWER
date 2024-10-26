// import React from "react";
// import { Link } from "react-router-dom";

// const Category = () => {
//   // Function to handle text-to-speech
//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className="fixed bg-gradient-to-r from-sky-500 to-indigo-500 w-screen items-center h-screen flex">
//       <div className="m-auto text-4xl font-medium p-5">
//         <h1 className="text-center mb-10 text-white">
//           What kind of interview would you like to practice?
//         </h1>
//         <div className="flex flex-shrink flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row gap-10 justify-center items-center">
//           <Link to="section/node">
//             <button
//               onMouseEnter={() => speak("Node")}
//               className="pl-24 pr-24 pt-16 pb-16 rounded-xl hover:shadow-2xl hover:pl-28 hover:pt-20 hover:pb-20 hover:pr-28 hover:bg-slate-900 hover:text-white transition-all bg-slate-200 text-4xl"
//             >
//               Node
//             </button>
//           </Link>
//           <Link to="section/mern">
//             <button
//               onMouseEnter={() => speak("Mern")}
//               className="pl-24 pr-24 pt-16 pb-16 rounded-xl hover:shadow-2xl hover:pl-28 hover:pt-20 hover:pb-20 hover:pr-28 hover:bg-slate-900 hover:text-white transition-all bg-slate-200 text-4xl"
//             >
//               Mern
//             </button>
//           </Link>
//           <Link to="section/java">
//             <button
//               onMouseEnter={() => speak("Java")}
//               className="pl-24 pr-24 pt-16 pb-16 rounded-xl hover:shadow-2xl hover:pl-28 hover:pt-20 hover:pb-20 hover:pr-28 hover:bg-slate-900 hover:text-white transition-all bg-slate-200 text-4xl"
//             >
//               Java
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Category;

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNode, faReact, faJava } from "@fortawesome/free-brands-svg-icons";

const Category = () => {
  // Function to handle text-to-speech
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen flex items-center">
      <div className="m-auto text-4xl font-medium p-5">
        <h1 className="text-center mb-10 text-white">
          What kind of interview would you like to practice?
        </h1>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          {/* Node Category */}
          <Link to="section/node">
            <div
              onMouseEnter={() => speak("Node")}
              className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faNode} size="4x" className="text-green-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700">Node</h2>
            </div>
          </Link>
          
          {/* MERN Category */}
          <Link to="section/mern">
            <div
              onMouseEnter={() => speak("Mern")}
              className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faReact} size="4x" className="text-blue-500 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700">MERN</h2>
            </div>
          </Link>
          
          {/* Java Category */}
          <Link to="section/java">
            <div
              onMouseEnter={() => speak("Java")}
              className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faJava} size="4x" className="text-red-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700">Java</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
