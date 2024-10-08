import React, { useState } from 'react';
//imported the bcrypt library
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreditCardForm = ({ onSave }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSave = async () => {
    if (!cardNumber || !nameOnCard || !expiryMonth || !expiryYear || !cvv) {
      setMessage('All fields are required.');
      return;
    }

    try {
      // hashes the data
      const hashedCardNumber = await bcrypt.hash(cardNumber, 10);
      const hashedNameOnCard = await bcrypt.hash(nameOnCard, 10);
      const hashedExpiryMonth = await bcrypt.hash(expiryMonth, 10);
      const hashedExpiryYear = await bcrypt.hash(expiryYear, 10);
      const hashedCvv = await bcrypt.hash(cvv, 10);

      // creates an object to store the hashed data
      const creditCardInfo = {
        hashedCardNumber,
        hashedNameOnCard,
        hashedExpiryMonth,
        hashedExpiryYear,
        hashedCvv,
      };

      // calls the parent function to save the hashed data

      onSave(creditCardInfo);

      // navigates to the paid route unless there's an error
      navigate('/paid');
    } catch (error) {
      console.error('Error hashing credit card information', error);
      setMessage('Failed to save credit card information.');
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    // Format the card number as nnnn nnnn nnnn nnnn
    const formattedValue =
      value
        .replace(/\D/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substr(0, 19) || '';
    setCardNumber(formattedValue);
  };

  return (
    <div className="credit-card">
      <h2>Enter Credit Card Information</h2>
      <input
        type="text"
        placeholder="Card Number (e.g., 1234 5678 9012 3456)"
        value={cardNumber}
        onChange={handleCardNumberChange}
        maxLength="19"
      />
      <input
        type="text"
        placeholder="Name on Card"
        value={nameOnCard}
        onChange={(e) => setNameOnCard(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiry Month (MM)"
        value={expiryMonth}
        onChange={(e) => setExpiryMonth(e.target.value)}
        maxLength="2"
      />
      <input
        type="text"
        placeholder="Expiry Year (YY)"
        value={expiryYear}
        onChange={(e) => setExpiryYear(e.target.value)}
        maxLength="2"
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        maxLength="3"
      />
      <button className="button" onClick={handleSave}>
        Submit Payment
      </button>
      <p>{message}</p>
    </div>
  );
};

export default CreditCardForm;
