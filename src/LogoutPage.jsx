
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutPage.css'; 
import { resetCart } from './store/cartActions';
import { useDispatch } from 'react-redux';

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    
    localStorage.removeItem('loggedInUser');
    dispatch(resetCart());

    
    navigate('/login');
  }, [dispatch,navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
    </div>
  );
};

export default LogoutPage;
