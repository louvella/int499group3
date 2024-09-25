import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  // This will open the Google login in a new popup window
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      // Save authentication state
      onLoginSuccess();
      navigate('/');
    },
    onError: () => {
      console.log('Login Failed');
    },
    flow: 'popup', // Opens Google OAuth in a popup window
  });

  // Automatically trigger the login when the component loads
  useEffect(() => {
    login();
  }, [login]);

  return (
    <div className="login-page">
      <h2>Redirecting to Google login...</h2>
    </div>
  );
};

export default GoogleLogin;
