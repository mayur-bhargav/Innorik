import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./loader";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
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
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post("https://innorik.onrender.com/signup", {
        name: values.firstName + " " + values.lastName,
        email: values.email,
        password: values.password,
        cpassword: values.cpassword,
      });

      setIsLoading(false);
      console.log("Server response:", response.data);
      navigate("/login");

      values.firstName = "";
      values.lastName = "";
      values.email = "";
      values.password = "";
      values.cpassword = "";
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

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
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
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          cpassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form autoComplete="off" noValidate>
            <Stack spacing={3}>
              <Stack
                component={motion.div}
                initial={{ opacity: 0, y: 60 }}
                animate={animate}
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
              >
                <Field
                  fullWidth
                  label="First name"
                  name="firstName"
                  as={TextField}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <Field
                  fullWidth
                  label="Last name"
                  name="lastName"
                  as={TextField}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Stack>

              <Stack
                spacing={3}
                component={motion.div}
                initial={{ opacity: 0, y: 40 }}
                animate={animate}
              >
                <Field
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  name="email"
                  as={TextField}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <Field
                  fullWidth
                  autoComplete="new-password"
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
                <Field
                  fullWidth
                  autoComplete="new-password"
                  type="password"
                  label="Confirm Password"
                  name="cpassword"
                  as={TextField}
                  error={Boolean(touched.cpassword && errors.cpassword)}
                  helperText={touched.cpassword && errors.cpassword}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
