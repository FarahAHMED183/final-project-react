import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; 

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'customer', 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    
    const isDuplicate = existingUsers.some((user) => user.username === formData.username);

    if (isDuplicate) {
      alert('Username already exists. Please choose a different username.');
      return; 
    }

  
    existingUsers.push(formData);

   
    localStorage.setItem('users', JSON.stringify(existingUsers));

   
    setFormData({
      username: '',
      password: '',
      role: 'customer',
    });

    
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2 style={{color:'#003366'}}>Register Now</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
