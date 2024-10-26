// import React, { useState } from "react";
// import axiosInstance from "../api/api";
// import { useToast } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     mobileNumber: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     console.log("Form submitted");
//     try {
//       const response = await axiosInstance.post("auth/signup", formData);
//       const token = response.data.jwt; // Extract the JWT token from the response

//       // Store the JWT token in local storage for later use
//       localStorage.setItem("jwtToken", token);

//       // Show success message
//       const successMessage = `Success: ${response.data.message}`;
//       alert(successMessage); 
//       navigate("/");// Display the success message as an alert
//     } catch (error) {
//       console.error("Error:", error);
//       const errorMessage = "Error: Unable to sign up.";
//       alert(errorMessage); // Display the error message as an alert
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-5 rounded shadow-md w-96">
//         <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-1">
//             <label htmlFor="firstName" className="block text-gray-600">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               className="w-full border rounded p-2"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="lastName" className="block text-gray-600">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               className="w-full border rounded p-2"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="email" className="block text-gray-600">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="w-full border rounded p-2"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="mobileNumber" className="block text-gray-600">
//               Mobile
//             </label>
//             <input
//               type="text"
//               id="mobileNumber"
//               name="mobileNumber"
//               className="w-full border rounded p-2"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="password" className="block text-gray-600">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="w-full border rounded p-2"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import axiosInstance from "../api/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhoneAlt, faLock } from "@fortawesome/free-solid-svg-icons";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("auth/signup", formData);
      const token = response.data.jwt;
      localStorage.setItem("jwtToken", token);

      alert(`Success: ${response.data.message}`);
      navigate("/");
    } catch (error) {
      alert("Error: Unable to sign up.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Join FutureVu.ai
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-600 mb-1 font-semibold">
              First Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 bg-gray-200 text-gray-600">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-3 py-2 focus:outline-none"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-600 mb-1 font-semibold">
              Last Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 bg-gray-200 text-gray-600">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-3 py-2 focus:outline-none"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-1 font-semibold">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 bg-gray-200 text-gray-600">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 focus:outline-none"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-gray-600 mb-1 font-semibold">
              Mobile Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 bg-gray-200 text-gray-600">
                <FontAwesomeIcon icon={faPhoneAlt} />
              </span>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                className="w-full px-3 py-2 focus:outline-none"
                placeholder="+123 456 7890"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-1 font-semibold">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 bg-gray-200 text-gray-600">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 focus:outline-none"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
