import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./loader";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = async (values) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data.isVerified === false) {
        toast.error("Email not verified");
        setIsLoading(false);
        return;
      }

      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setError("");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response && error.response.status === 400) {
        toast.error("Email not verified");
      } else {
        toast.error("An error occurred while logging in");
      }
      setIsLoading(false);
    }
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

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
      <Formik
        initialValues={{
          email: "",
          password: "",
          remember: true,
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form autoComplete="off">
            <Box
              component={motion.div}
              animate={{
                transition: {
                  staggerChildren: 0.55,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
                component={motion.div}
                initial={{ opacity: 0, y: 40 }}
                animate={animate}
              >
                <Field
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email Address"
                  name="email"
                  as={TextField}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <Field
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  as={TextField}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <Icon icon="eva:eye-fill" />
                          ) : (
                            <Icon icon="eva:eye-off-fill" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={animate}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ my: 2 }}
                >
                  <FormControlLabel
                    control={
                      <Field type="checkbox" name="remember" as={Checkbox} />
                    }
                    label="Remember me"
                  />

                  <Link
                    component={RouterLink}
                    variant="subtitle2"
                    to="#"
                    underline="hover"
                  >
                    Forgot password?
                  </Link>
                </Stack>

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {isLoading ? <LoadingSpinner /> : "Login"}
                </LoadingButton>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
