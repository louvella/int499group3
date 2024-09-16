import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs'; 

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAddUser = () => {
    if (!username || !password) {
      setMessage('Please enter a username and password.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      setMessage('Username already exists. Please choose another one.');
      return;
    }

    // passwords are stored hashed - had to install bcrypt 
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setMessage('User added successfully!');
    setUsername('');
    setPassword('');
    navigate('/login'); // Navigate back to login page after adding user
  };

  return (
    <div className="login-form">
      <h2>Add New User</h2>
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
      <button className="button" onClick={handleAddUser}>Add User</button>
      <p>{message}</p>
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default AddUser;
