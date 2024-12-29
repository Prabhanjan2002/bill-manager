import React, { useState, useEffect } from "react";
import BillList from "./components/BillList";
import CategoryFilter from "./components/CatagoryFilter";
import TimeSeriesChart from "./components/TimeSeriesChart"; // Import the Time-Series Chart
import EditBillModal from "./components/EditBillModel"; // Modal for editing bills
import { calculateMinimumBills } from "./utils/billUtils"; // Import the utility function

const App = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState(50000); // Sample monthly budget for Level 2
  const [highlightedBills, setHighlightedBills] = useState([]);
  const [showHighlightedBills, setShowHighlightedBills] = useState(false); // Flag to toggle highlighted bills
  const [billToEdit, setBillToEdit] = useState(null); // Bill being edited

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bills");
        const data = await response.json();
        setBills(data);
        setFilteredBills(data); // Initially showing all bills
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  const handleCategoryFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredBills(bills); // Show all bills if no category is selected
    } else {
      const filtered = bills.filter((bill) => bill.category === category);
      setFilteredBills(filtered);
    }
  };

  const addBill = (newBill) => {
    setBills((prevBills) => {
      const updatedBills = [...prevBills, newBill];
      setFilteredBills(updatedBills); // Ensure filteredBills is also updated
      return updatedBills;
    });
  };

  const calculateBillsToPay = () => {
    const result = calculateMinimumBills(bills, monthlyBudget);
    setHighlightedBills(result);
    setShowHighlightedBills(true); // Show the highlighted bills after calculation
  };

  // Delete a bill
  const deleteBill = async (billId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bills/${billId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the bill.");
      }

      setBills((prevBills) => prevBills.filter((bill) => bill._id !== billId));
      setFilteredBills((prevFiltered) =>
        prevFiltered.filter((bill) => bill._id !== billId)
      );
    } catch (error) {
      console.error("Error deleting bill:", error);
      alert("Failed to delete the bill. Please try again later.");
    }
  };

  // Open modal for editing a bill
  const openEditModal = (bill) => {
    setBillToEdit(bill);
  };

  // Edit a bill
  const editBill = async (updatedBill) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bills/${updatedBill._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBill),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the bill.");
      }

      const data = await response.json();

      setBills((prevBills) =>
        prevBills.map((bill) => (bill._id === updatedBill._id ? data : bill))
      );
      setFilteredBills((prevFiltered) =>
        prevFiltered.map((bill) => (bill._id === updatedBill._id ? data : bill))
      );

      setBillToEdit(null); // Close the modal after saving
    } catch (error) {
      console.error("Error editing bill:", error);
      alert("Failed to edit the bill. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bill Manager</h1>

      {/* Category Filter */}
      <div className="mb-4">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryFilterChange}
        />
      </div>

      {/* Input for Monthly Budget */}
      <div className="form-group mb-4">
        <label htmlFor="budget">Set Monthly Budget: </label>
        <input
          id="budget"
          type="number"
          className="form-control"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(e.target.value)}
        />
      </div>

      {/* Button to calculate minimum bills to pay */}
      <button className="btn btn-primary mb-4" onClick={calculateBillsToPay}>
        Calculate Minimum Bills to Pay
      </button>

      {/* Bill List with highlighted bills */}
      <BillList
        bills={filteredBills}
        highlightedBills={highlightedBills}
        showHighlightedBills={showHighlightedBills}
        onDelete={deleteBill}
        onEdit={openEditModal}
      />

      {/* Time-Series Chart */}
      <TimeSeriesChart bills={filteredBills} />

      {/* Edit Bill Modal */}
      {billToEdit && (
        <EditBillModal
          bill={billToEdit}
          onSave={editBill}
          onClose={() => setBillToEdit(null)}
        />
      )}
    </div>
  );
};

export default App;
