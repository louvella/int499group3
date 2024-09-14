// LoginForm.js
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
      setMessage('Login successful!');
      onLogin(); // Set authentication status to true
      navigate('/'); // Redirect to homepage after login
    } else {
      setMessage('Invalid username or password.');
    }
  };

  return (
    <div className="login-form">
      <input
        type="text"
        placeholder="Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default LoginForm;
