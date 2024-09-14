// Subscription.js - good one
import React, { useState } from 'react';
import list from './data'; // Import the subscription data from data.js
import cartIcon from './assets/cart.png'; // Assuming the cart image is in the assets folder
import removeIcon from './assets/remove.png'; // Assuming the remove image is in the assets folder

const Subscription = () => {
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleSelectSubscription = (subscription) => {
    if (selectedSubscription && selectedSubscription !== subscription) {
      // Alert if a different subscription is being selected
      alert(`You have deselected the ${selectedSubscription.service} plan.`);
    }

    // Select the clicked subscription or deselect if it's the same
    setSelectedSubscription((prev) =>
      prev === subscription ? null : subscription
    );
  };

  return (
    <div className="subscription-container">
      <h2>Subscription Plans</h2>
      <div className="subscription-list">
        {list.map((subscription) => {
          const isSelected = selectedSubscription === subscription;
          return (
            <div key={subscription.id} className="subscription-card">
              <img
                src={subscription.img}
                alt={subscription.service}
                className="subscription-image"
              />
              <h3>{subscription.service}</h3>
              <p>{subscription.serviceInfo}</p>
              <p>Price: ${subscription.price.toFixed(2)}</p>
              <div
                className="cart-button"
                onClick={() => handleSelectSubscription(subscription)}
              >
                <img
                  src={isSelected ? removeIcon : cartIcon}
                  alt={isSelected ? 'Remove from Cart' : 'Add to Cart'}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subscription;
