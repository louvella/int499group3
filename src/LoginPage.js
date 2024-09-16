import React from 'react';
// imports the header component as the page header
import Header from './Header';
// imports the LoginForm component for handling user login
import LoginForm from './LoginForm';

// loginPage component that represents the login page
const LoginPage = ({ onLogin }) => { 
  return (
    <div className="login-page">
      <Header />
      <LoginForm onLogin={onLogin} /> 
    </div>
  );
};

export default LoginPage;
