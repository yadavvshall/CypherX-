// Form.jsx

import React, { useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import firebase from "../firebase";
import "../App.css";

const getCurrentMonth = () => {
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Add padding for single-digit months
  const year = today.getFullYear();
  return `${year}-${month}`;
};

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: 18,
    batch: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    paymentPlan: "500",
    paymentAmount: 500,
    selectedMonth: getCurrentMonth(),
  });

  const [batchSelected, setBatchSelected] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [ageErrorMessage, setAgeErrorMessage] = useState("");

  const handleBatchSelect = (selectedBatch) => {
    setFormData({ ...formData, batch: selectedBatch });
    setBatchSelected(true);
  };

  const handlePaymentPlanSelect = (selectedPlan) => {
    setFormData({
      ...formData,
      paymentPlan: selectedPlan,
      paymentAmount: parseInt(selectedPlan),
    });
  };

  const handleSubmit = async () => {
    try {
      const db = getFirestore(firebase);

      if (
        !formData.name ||
        !formData.age ||
        !formData.batch ||
        !formData.paymentPlan
      ) {
        console.error("Invalid data");
        setSubmitSuccess(false);
        return;
      }

      if (formData.age < 18 || formData.age > 65) {
        setAgeErrorMessage("Age must be between 18 and 65");
        return;
      } else {
        setAgeErrorMessage("");
      }

      const userId = formData.name;
      const enrollmentRef = collection(db, "enroll");
      const userQuery = query(enrollmentRef, where("name", "==", userId));
      const userDocs = await getDocs(userQuery);

      if (!userDocs.empty) {
        const userDoc = userDocs.docs[0];
        await updateDoc(userDoc.ref, formData);
      } else {
        await setDoc(doc(enrollmentRef, userId), formData);
      }

      console.log("Form data submitted successfully:", formData);

      setFormData({
        name: "",
        age: 18,
        batch: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        paymentPlan: "500",
        paymentAmount: 500,
        selectedMonth: getCurrentMonth(),
      });

      setBatchSelected(false);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitSuccess(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="heading text-3xl font-bold mb-4">
        Yoga Class Admission Form
      </h1>
      {submitSuccess !== null && (
        <div
          className={`${
            submitSuccess ? "success-message" : "error-message"
          } mb-4 font-bold`}
        >
          {submitSuccess
            ? "Form submitted successfully!"
            : "Error submitting form. Please try again."}
        </div>
      )}
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            className="age shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Age:
          </label>
          <input
            type="number"
            className="age shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.age}
            onChange={(e) => {
              const enteredAge = parseInt(e.target.value);
              setFormData({ ...formData, age: enteredAge });

              // Check if age is below 18 or above 65 and display message accordingly
              if (enteredAge < 18) {
                setAgeErrorMessage("Age must be 18 or above");
              } else if (enteredAge > 65) {
                setAgeErrorMessage("Age must be 65 or below");
              } else {
                setAgeErrorMessage("");
              }
            }}
          />
          {/* Display age error message */}
          {ageErrorMessage && (
            <div className="text-red-500 text-sm">{ageErrorMessage}</div>
          )}
        </div>
        <div className="mb-4">
          <label className=" age block text-gray-700 text-sm font-bold mb-2">
            Preferred Batch:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.batch}
            onChange={(e) => handleBatchSelect(e.target.value)}
          >
            <option value="">Select Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </div>
        {batchSelected && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Payment Plan:
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.paymentPlan}
                onChange={(e) => handlePaymentPlanSelect(e.target.value)}
              >
                <option value="500">500</option>
              </select>
            </div>
            <div className="mb-4">
              <label className=" block text-gray-700 text-sm font-bold mb-2">
                Card Number:
              </label>
              <input
                type="text"
                className="age shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.cardNumber}
                onChange={(e) =>
                  setFormData({ ...formData, cardNumber: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Expiration Date:
              </label>
              <input
                type="month"
                className="age shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.selectedMonth}
                onChange={(e) =>
                  setFormData({ ...formData, selectedMonth: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                CVV:
              </label>
              <input
                type="text"
                className="age shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.cvv}
                onChange={(e) =>
                  setFormData({ ...formData, cvv: e.target.value })
                }
              />
            </div>
          </>
        )}
        <button type="button" className="custom-button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
