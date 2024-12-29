import React, { useState } from "react";
import axios from "axios";

const BillList = ({
  bills,
  highlightedBills,
  showHighlightedBills,
  onDelete,
  onEdit,
}) => {
  const [newBill, setNewBill] = useState({
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBill({ ...newBill, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bills",
        newBill
      );
      bills.push(response.data);
      setNewBill({ description: "", category: "", amount: "", date: "" });
    } catch (error) {
      console.error("Error adding bill:", error);
    }
  };

  return (
    <div className="container py-4">
      {/* Add New Bill Form */}
      <div className="card mb-4 shadow-lg">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Add New Bill</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={newBill.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter description"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={newBill.category}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter category"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={newBill.amount}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={newBill.date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Bill
            </button>
          </form>
        </div>
      </div>

      {/* Bill List */}
      <h3 className="text-center text-white mb-4">Bill List</h3>
      <div
        className={`row g-4 ${
          bills.length === 1 ? "justify-content-center" : ""
        }`}
      >
        {bills.map((bill) => {
          const isHighlighted = highlightedBills.some(
            (highlightedBill) => highlightedBill._id === bill._id
          );

          return (
            <div
              key={bill._id}
              className={`col-12 ${
                bills.length === 1 ? "w-50" : "col-sm-6 col-md-4 col-lg-3"
              }`}
            >
              <div
                className={`card h-100 shadow ${
                  isHighlighted && showHighlightedBills
                    ? "bg-success text-white"
                    : "bg-light text-dark"
                }`}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">
                    {bill.description}
                  </h5>
                  <p className="card-text mb-1">
                    <strong>Category:</strong> {bill.category}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Amount:</strong> ₹{bill.amount}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Date:</strong>{" "}
                    {new Date(bill.date).toLocaleDateString()}
                  </p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(bill._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => onEdit(bill)}
                    >
                      Edit
                    </button>
                  </div>
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
