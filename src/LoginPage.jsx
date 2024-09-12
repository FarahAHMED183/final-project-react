import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', username);
      setCurrentUser(user);

      if (user.role === 'customer') {
        navigate('/customer-dashboard');
      } else if (user.role === 'seller') {
        navigate('/seller-dashboard');
      }

      setUsername('');
      setPassword('');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ color: 'rgb(38, 100, 187)' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="redirect-link">
        <Link to="/register">You don't have an account? Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
