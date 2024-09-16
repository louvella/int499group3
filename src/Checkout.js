import React, { useEffect, useState } from 'react';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // loads the cart items and selected subscription from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedSubscription = JSON.parse(localStorage.getItem('selectedSubscription')) || null;
    
    setCart(storedCart);
    setSelectedSubscription(storedSubscription);
  }, []);

  // calculates the total
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  const subscriptionTotal = selectedSubscription ? selectedSubscription.price : 0;
  const totalPrice = cartTotal + subscriptionTotal;

  // alert for under construction
  const handlePayment = () => {
    alert("Payment feature is under construction.");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cart.length === 0 && !selectedSubscription ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
            {selectedSubscription && (
              <li>
                {selectedSubscription.service} - ${selectedSubscription.price.toFixed(2)}
              </li>
            )}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button className="payment-button" onClick={handlePayment}>Proceed to Payment</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
