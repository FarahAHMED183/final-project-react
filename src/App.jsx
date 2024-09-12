
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import Header from './Header';
import LogoutPage from './LogoutPage';
import ProductsPage from './ProductsPage';
import SellerDashboard from './SellerDashboard';
import Cart from './Cart';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.username === loggedInUser);
    setCurrentUser(user);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/cart" element={<Cart/>} />



        
        {currentUser?.role === 'customer' ? (
          <Route path="/customer-dashboard" element={<ProductsPage />} />
        ) : (
          <Route path="/customer-dashboard" element={<Navigate to="/login" />} />
        )}

        
        {currentUser?.role === 'seller' ? (
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
        ) : (
          <Route path="/seller-dashboard" element={<Navigate to="/login" />} />
        )}

        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
