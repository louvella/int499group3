import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log('Login successful:', response);  // handle successful Google OAuth login
      onLoginSuccess();
      // redirects to homepage after successful login
      navigate('/');
    },
    onError: () => {
      console.log('Login Failed'); // handle login failure
    },
    flow: 'popup', // directs to use a popup for Google OAuth login
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
