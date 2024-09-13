import React from 'react';

const LoginForm = () => {
  return (
    <div className="login-form">
      <input type="text" placeholder="Username..." />
      <input type="password" placeholder="Password..." />
      <a href="#" className="forgot-password">Forgot Password?</a>
      <button className="login-button">Login</button>
    </div>
  );
};

export default LoginForm;
