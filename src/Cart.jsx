import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from './store/cartActions';
import './Cart.css'; 

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-page">
      <h2 className="page-title">Shopping Cart</h2>
      {items.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-description">{item.description}</p>
                <p className="cart-item-price">Price: ${item.price}</p>
              </div>
              <button className="remove-button" onClick={() => handleRemove(item)}>Remove</button>
            </div>
          ))}
          <button className="clear-cart-button" onClick={handleClear}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
