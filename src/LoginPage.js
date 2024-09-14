// LoginPage.js
import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';

const LoginPage = ({ onLogin }) => { // Accept onLogin as a prop
  return (
    <div className="login-page">
      <Header />
      <LoginForm onLogin={onLogin} /> {/* Pass onLogin down to LoginForm */}
    </div>
  );
};

export default LoginPage;
