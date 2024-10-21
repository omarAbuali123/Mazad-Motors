
import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';

const PayPalPayment = ({ carId, userId, amount }) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const createOrder = async () => {
    try {
      const response = await axios.post("/api/payments/create-order", {
        amount,
        carId,
        userId,
      });
      return response.data.id;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      setPaymentError("Failed to create order. Please try again.");
      throw error;
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await axios.post("/api/payments/capture-order", {
        orderId: data.orderID,
        carId,
        userId,
      });

      if (response.data.status === "COMPLETED") {
        setPaymentSuccess(true);
      } else {
        setPaymentError("Payment failed.");
      }
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      setPaymentError("There was an issue processing your payment.");
    }
  };

  return (
    <div>
      {paymentError && <div>{paymentError}</div>}
      {paymentSuccess ? (
        <div>Payment successful!</div>
      ) : (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(error) => setPaymentError("Payment approval failed.")}
        />
      )}
    </div>
  );
};

export default PayPalPayment;
