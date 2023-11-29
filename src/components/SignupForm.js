import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./loader";
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import {  Link , useNavigate } from "react-router-dom";
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        password: formData.password,
        cpassword: formData.cpassword,
      });

      setIsLoading(false);
      console.log("Server response:", response.data);
      navigate("/login");

      setFormData({
        firstName: "",
        lastName: "",
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
      setIsLoading(false);
    }
  };

  return (
    <div>
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
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={Boolean(formData.firstName === "" && error)}
              helperText={formData.firstName === "" && error}
            />

            <TextField
              fullWidth
              label="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={Boolean(formData.lastName === "" && error)}
              helperText={formData.lastName === "" && error}
            />
          </Stack>

          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={Boolean(formData.email === "" && error)}
              helperText={formData.email === "" && error}
            />

            <TextField
              fullWidth
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={Boolean(formData.password === "" && error)}
              helperText={formData.password === "" && error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
            style={{ marginBottom: "21px" }}
          >
            <TextField
              fullWidth
              autoComplete="new-password"
              type="password"
              label="Confirm Password"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleInputChange}
              error={Boolean(formData.cpassword === "" && error)}
              helperText={formData.cpassword === "" && error}
            />

            <LoadingButton
              style={{ marginTop: "20px" }}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {isLoading ? <LoadingSpinner /> : "Sign up"}
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default SignupForm;
