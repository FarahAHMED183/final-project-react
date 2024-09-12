// ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from './store/cartActions'; // Import addItem action
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Use dispatch to send actions

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error('Unexpected API response format');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError(err.message || 'Error loading products.');
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch addItem action
  };

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="products-page">
      <h1 className="page-title">Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">
                {product.description.length > 100 ? (
                  <>
                    {product.description.slice(0, 100)}...
                    <button className="read-more-button" onClick={() => alert(product.description)}>Read more</button>
                  </>
                ) : (
                  product.description
                )}
              </p>
              <p className="product-price">${product.price}</p>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
