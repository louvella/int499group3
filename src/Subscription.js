import React, { useState, useEffect } from "react";
import list from "./data";
import cartIcon from "./assets/cart.png";
import removeIcon from "./assets/remove.png";

const Subscription = () => {
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // loads the selected subscription from local storage when the component is loaded
  useEffect(() => {
    const storedSubscription = JSON.parse(
      localStorage.getItem("selectedSubscription")
    );
    if (storedSubscription) {
      setSelectedSubscription(storedSubscription);
    }
  }, []);

  // handles the subscription selection and only allows one selection or allows the deselection of the current subscription
  const handleSelectSubscription = (subscription) => {
    if (selectedSubscription && selectedSubscription.id === subscription.id) {

      // deselects the subscription
      setSelectedSubscription(null);
      localStorage.removeItem("selectedSubscription");
    } else {
      // selects the new subscription
      setSelectedSubscription(subscription);
      localStorage.setItem(
        "selectedSubscription",
        JSON.stringify(subscription)
      );
    }
  };

  return (
    <div className="subscription-container">
      <h2>Subscription Plans</h2>
      <div className="subscription-list">
        {list.map((subscription) => {
          // Check if the subscription is selected
          const isSelected =
            selectedSubscription &&
            selectedSubscription.id === subscription.id;
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
                  alt={isSelected ? "Remove from Cart" : "Add to Cart"}
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
