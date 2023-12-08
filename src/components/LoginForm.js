import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import user_icon from "./image/person.png";
import password_icon from "./image/password.png";
import email_icon from "./image/email.png";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [action, setaction] = useState("Login");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://innoriknews.onrender.com/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setError("");
      setRedirectToHome(true);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Invalid email or password");
        } else if (error.response.status === 400) {
          toast.error("Email not verified");
        } else {
          toast.error("An error occurred while logging in");
        }
      } else if (error.request) {
        console.error("No response received from the server");
        toast.error("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
        toast.error("An error occurred while logging in");
      }

      setIsLoading(false);
    }
  };

  // Add this at the end of your component
  useEffect(() => {
    if (redirectToHome) {
      navigate("/", { replace: true });
    }
  }, [redirectToHome]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://innoriknews.onrender.com/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          cpassword: formData.cpassword,
        }
      );

      console.log("Server response:", response.data);
      toast.success("Signup successful. Please log in.");

      navigate("/user");
      setFormData({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already registered");
      } else if (error.response && error.response.status === 401) {
        toast.error("Password does not match");
      } else {
        toast.error("Error signing up:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
    <div className="container">
      <div className="header1">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setaction("Sign Up");
          }}
        >
          Sign up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setaction("Login");
          }}
        >
          {" "}
          Login
        </div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name"  value={formData.name}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              } />
          </div>
        )}
        {action === "Login" ? (
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email I'D"  value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
        ) : (
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email I'D"   value={formData.email}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }))
              }/>
          </div>
        )}
        {action === "Login" ? (
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
        ) : (
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password"  value={formData.password}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  password: e.target.value,
                }))
              }/>
          </div>
        )}
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Confirm Password"   value={formData.cpassword}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  cpassword: e.target.value,
                }))
              }/>
          </div>
        )}
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Lost Password <span>Click Here</span>
        </div>
      )}
      <div className="submit-container-button">
      {action === "Sign Up" ? (
        <div className="submit-button" onClick={handleSignupFormSubmit} type="button">Sign up</div>
      ) : (
        <div className="submit-button" type="button" onClick={handleLogin}>Login</div>
      )}
    </div>
    </div>
    </>
  );
};

export default LoginForm;
