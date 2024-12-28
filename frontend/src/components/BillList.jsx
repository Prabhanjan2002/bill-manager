import React from "react";

const BillList = ({ bills, highlightedBills, showHighlightedBills }) => {
  return (
    <div>
      <h3 className="text-center mb-4">Bill List</h3>
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
