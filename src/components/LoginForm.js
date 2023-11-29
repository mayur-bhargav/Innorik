import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Components from "./components";
import "../App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(true);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSignInClick = () => {
    setSignIn((prevSignIn) => !prevSignIn);
  };

  const handleSignUpClick = () => {
    setSignIn((prevSignIn) => !prevSignIn);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

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
      const response = await axios.post("http://localhost:5000/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cpassword: formData.cpassword,
      });
  
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
    <Components.Container className="container1">
      <form autoComplete="off" noValidate>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title className="tittle">Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />
            <Components.Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }))
              }
            />
            <Components.Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  password: e.target.value,
                }))
              }
            />
            <Components.Input
              type="password"
              placeholder="Confirm Password"
              value={formData.cpassword}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  cpassword: e.target.value,
                }))
              }
            />
            <Components.Button type="button" onClick={handleSignupFormSubmit}>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
      </form>
      <form autoComplete="off" noValidate>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button type="button" onClick={handleLogin}>
              Sign In
            </Components.Button>
          </Components.Form>
        </Components.SignInContainer>
      </form>

      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title className="welco" >Welcome Back!</Components.Title>
            <Components.Paragraph className="para1">
              To keep connected with us, please login with your personal info
            </Components.Paragraph>

            <Components.GhostButton onClick={handleSignInClick}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start the journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={handleSignUpClick}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
    </>
  );
};

export default LoginForm;
