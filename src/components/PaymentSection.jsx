// PaymentSection.jsx
import "../App.css"; 
import React from "react";
import StripeCheckout from "react-stripe-checkout";

// eslint-disable-next-line react/prop-types
const PaymentSection = ({ formData, setSubmitSuccess }) => {
  const handleToken = async (token) => {
    try {
      // TODO: Replace the following line with actual payment gateway integration logic
      console.log("Received token:", token);

      // Simulate successful payment
      console.log("Payment successful!");
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error processing payment:", error);
      setSubmitSuccess(false);
    }
  };

  return (
    <div className="text-center cont">
      <h2 className="heading text-2xl font-bold mb-4">Payment Section</h2>
      <StripeCheckout
        token={handleToken}
        stripeKey="pk_test_51OOupqSFLrIipQpoXN2gtu71CHTWhd2sXJkb7vnWwFcrPqqYkVlIpynVLbXtIwF5qWvYk5ocWh350bVPkHLal1jO00TOshDDkU" // Replace with your actual Stripe Publishable Key
        // eslint-disable-next-line react/prop-types
        amount={formData.paymentAmount * 100} // Stripe amounts are in cents
        name="Yoga Class Payment"
        // eslint-disable-next-line react/prop-types
        description={`Payment for ${formData.selectedMonth} batch`}
        billingAddress={false}
        zipCode={false}
        currency="INR" // Set currency to INR
      >
        <button className="custom-button">Make Payment</button>
      </StripeCheckout>
    </div>
  );
};

export default PaymentSection;
