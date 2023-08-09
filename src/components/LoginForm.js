import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import LoadingSpinner from "./loader";
import { Link, useNavigate } from "react-router-dom";
// import Background from "./volunteer.jpg";
import { toast,ToastContainer } from "react-toastify";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous error
   
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password, 
        }
      );
      if (response.data.isVerified = false) {
        console.log(response.data.isVerified)
        toast.error("Email not verified"); // Show an error toast
        setIsLoading(false);
        return;
      }
      // Assuming the server responds with a token
      const token = response.data.token;
      // Store the token in local storage
      localStorage.setItem("jwtToken", token);
      console.log( token)
      // Perform any other actions after successful login
      setIsLoading(false);
      console.log("Server response:", response.data);
      setEmail("");
      setPassword("");
      setError("");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else if (error.response && error.response.status === 400) {
        toast.error("Email not verified"); // Display a generic error message
      console.error("Error logging in:", error.message);
    }
      else{
        setError("An error occurred while logging in"); // Display a generic error message
        console.error("Error logging in:", error.message);
      }
      setIsLoading(false);
    }
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout");
      localStorage.removeItem("jwtToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <>
      <div className="body">
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        <div className="main">
          {/* <div className='first'>
            <img src='./volunteer.jpg' />
          </div> */}
          <div className="second">
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="" className="forgot">
                Forgot Password?
              </a>
              {error && <p>{error}</p>}

              {/* <button disabled={isLoading} type="submit">{isLoading ? <LoadingSpinner /> : <a>Log In</a>}</button> */}
              <a>{isLoading ? <LoadingSpinner /> : <button>Log In</button>}</a>
              <Link to="/register">
                <h6>
                  Don't have an Account?<a>SignUp</a>
                </h6>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
