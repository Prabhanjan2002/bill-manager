import React, { useState } from "react";

const AddBillForm = ({ addBill }) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !category || !amount || !date) {
      alert("Please fill in all fields");
      return;
    }

    const newBill = {
      _id: Date.now(), // Use timestamp as a simple ID
      description,
      category,
      amount,
      date,
    };

    addBill(newBill);

    // Reset form
    setDescription("");
    setCategory("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="mb-4">
      <h3 className="text-center mb-3">Add New Bill</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100 mt-3">
          Add Bill
        </button>
      </form>
    </div>
  );
};

export default AddBillForm;
