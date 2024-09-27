// GoogleLogin.js

import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log('Login successful:', response);
      onLoginSuccess();
      navigate('/');
    },
    onError: () => {
      console.log('Login Failed');
    },
    flow: 'popup',
  });

  useEffect(() => {
    login(); // Automatically trigger the login process on component load
  }, [login]);

  return (
    <div className="login-page">
      <h2>Redirecting to Google login...</h2>
    </div>
  );
};

export default GoogleLogin;
