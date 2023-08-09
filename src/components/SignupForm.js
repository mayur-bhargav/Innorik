import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import LoadingSpinner from "./loader";

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://innorik.onrender.com/signup', {
        name,
        email,
        password,
        cpassword,
      });
      setIsLoading(false);
      console.log('Server response:', response.data);

      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');
      setcPassword('');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Email already registered');
        setIsLoading(false);
      } else {
        console.error('Error signing up:', error.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
       <div className='body'>
      <div className='main'>
        {/* <div className='first'>
          <img src='./blood.png' />
        </div> */}
        <div className='second'>
          <form onSubmit={handleSubmit}>
            <h1>SignUp</h1>
            <input
              type="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
            <input
              type="password"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
            />
            {error && <p>{error}</p>}
            <a >{isLoading ? <LoadingSpinner /> : <button>Sign Up</button>}</a>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default SignupForm;
