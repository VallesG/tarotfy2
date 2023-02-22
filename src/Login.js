import React from 'react';
import { getAuthUrl } from './auth';

const Login = () => {
  const handleClick = () => {
    window.location = getAuthUrl();
  };

  return (
    <div>
      <img src="logo.png" alt="My Music App Logo" />
      <h1>Welcome to My Music App</h1>
      <p>Get a personalized tarot reading from your Spotify playlist!</p>
      <button onClick={handleClick}>Sign in with Spotify</button>
    </div>
  );
};

export default Login;
