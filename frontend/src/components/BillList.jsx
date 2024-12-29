import React, { useState } from "react";
import axios from "axios";

const BillList = ({ bills, highlightedBills, showHighlightedBills }) => {
  const [newBill, setNewBill] = useState({
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBill({ ...newBill, [name]: value });
  };

  // Submit the form data to backend (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bills",
        newBill
      );
      // Assuming the backend returns the updated bill or bill list, you can add it to your state
      // Here bills are updated with the newly added bill
      bills.push(response.data);
      setNewBill({ description: "", category: "", amount: "", date: "" }); // Reset form
    } catch (error) {
      console.error("Error adding bill:", error);
    }
  };

  return (
    <div>
      <h3 className="text-center mb-4">Add New Bill</h3>

      {/* add new bill */}

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="description"
          value={newBill.description}
          onChange={handleChange}
          placeholder="Description"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="category"
          value={newBill.category}
          onChange={handleChange}
          placeholder="Category"
          className="form-control mb-2"
        />
        <input
          type="number"
          name="amount"
          value={newBill.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="form-control mb-2"
        />
        <input
          type="date"
          name="date"
          value={newBill.date}
          onChange={handleChange}
          placeholder="Date"
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          Add Bill
        </button>
      </form>

      <h3 className="text-center mb-4">Bill List</h3>
      {/* Existing Bill List */}
      <div className="row">
        {bills.map((bill) => {
          const isHighlighted = highlightedBills.some(
            (highlightedBill) => highlightedBill._id === bill._id
          );

          return (
            <div key={bill._id} className="col-md-4 mb-4">
              <div
                className={`card ${
                  isHighlighted && showHighlightedBills
                    ? "bg-success text-white" // Added background color and text color
                    : ""
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title">{bill.description}</h5>
                  <p className="card-text">
                    <strong>Category:</strong> {bill.category}
                  </p>
                  <p className="card-text">
                    <strong>Amount:</strong> ₹{bill.amount}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {bill.date}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BillList;
