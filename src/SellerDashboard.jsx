import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SellerDashboard.css'; // Import the CSS file for styling

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch orders for the seller
    axios.get('https://fake-store-api.mock.beeceptor.com/api/orders')
      .then(response => {
        // Set orders and handle data if it includes items
        const ordersWithItems = response.data.map(order => ({
          ...order,
          items: order.items || [] // Ensure items array exists
        }));
        setOrders(ordersWithItems);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="dashboard-loading">Loading orders...</div>;
  if (error) return <div className="dashboard-error">Error loading orders.</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Seller Dashboard</h1>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-orders">
          <h2 style={{color:'#236db6'}}>Recent Orders: </h2>
          <div className="orders-list">
            {orders.length > 0 ? (
              orders.map(order => (
                <div className="order-card" key={order.id}>
                  <h3>Order ID: {order.order_id}</h3>
                  <p><strong>User ID:</strong> {order.user_id}</p>
                  <p><strong>Total Price:</strong> ${order.total_price.toFixed(2)}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                  <div className="order-items">
                    <h4>Items:</h4>
                    {order.items.length > 0 ? (
                      <ul>
                        {order.items.map(item => (
                          <li key={item.product_id}>
                            <strong>Product ID:</strong> {item.product_id}, <strong>Quantity:</strong> {item.quantity}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No items in this order.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No orders available.</p>
            )}
          </div>
        </section>
      </main>
      <footer className="dashboard-footer">
        <p>&copy; 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default SellerDashboard;
