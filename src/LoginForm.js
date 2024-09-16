import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username);
    // if login is successful
    if (user && bcrypt.compareSync(password, user.password)) {
      setMessage('Login successful!');
      // sets the authentication status to true
      onLogin(); 
      // redirects user to homepage after login
      navigate('/'); 
    } else {
      setMessage('Invalid username or password.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
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
      <button className="button" onClick={handleLogin}>Login</button>
      <Link to="/add-user">
        <button className="button">Register</button>
      </Link>
      {/* this is where the login message or error is desiplayed if user login is not successful */}
      <p>{message}</p>
      {/* register button using Link to navigate to /add-user */}

    </div>
  );
};

export default LoginForm;
