import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import LoadingSpinner from "./loader";
import { Link, useNavigate } from "react-router-dom";
import Background from "./volunteer.jpg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/signup", {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.isLoggedIn);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );
      // Assuming the server responds with a token
      const token = response.data.token;
      // Store the token in local storage
      localStorage.setItem("jwtToken", token);
      // Perform any other actions after successful login
      setIsLoading(false);
      console.log("Server response:", response.data);
      setEmail("");
      setPassword("");
      setError("");
      checkLoginStatus();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        console.error("Error logging in:", error.message);
      }
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://blood-bank-mzgj.onrender.com/logout", null, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="body">
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
              <Link to="/signup">
                <h5>
                  Don't have an Account?<a>SignUp</a>
                </h5>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
