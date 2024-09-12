import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import './Header.css'; 
import { resetCart } from './store/cartActions';

function Header() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const username = localStorage.getItem('loggedInUser');
  const cartItems = useSelector(state => state.cart.items); 

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
    dispatch(resetCart);
  
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">
          <Link to="/" className="brand-link">Dreamy Daisies</Link>
        </h1>
        <ul className="nav-links">
          <li><Link className="nav-link" to="/">Home</Link></li>
          {username && (
            <li><Link className="nav-link" to="/cart"> Cart: {cartItems.length}</Link></li> 
          )}
          <li><Link className="nav-link" to="/register">Register</Link></li>
          <li><Link className="nav-link" to="/login">Login</Link></li>
          {username ? (
            <>
              <li><Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link></li>
              <li className="nav-link">
                <p className="user-greeting">Hello, {username}</p>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </header>
  );
}

export default Header;
