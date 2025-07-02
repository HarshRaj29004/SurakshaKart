import React from 'react';
import '../CSS/Cart.css';
import { useLocation } from 'react-router-dom';

const Cart = () => {
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];

    const getTotal = () =>
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Product</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <img src={item.image} alt={item.name} width={50} height={50} />
                                        {item.name}
                                    </td>
                                    <td>{item.description || 'No description available'}</td>
                                    <td>₹{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ textAlign: 'right', marginTop: 20 }}>
                        <strong>Total: ₹{getTotal()}</strong>
                    </div>
                    <div style={{ textAlign: 'right', marginTop: 20 }}>
                        <button
                            style={{
                                padding: '10px 20px',
                                background: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 4,
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                            onClick={() => alert('Proceeding to Buy')}
                        >
                            Proceed to Buy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
