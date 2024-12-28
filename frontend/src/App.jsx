import React, { useState, useEffect } from "react";
import BillList from "./components/BillList";
import BillForm from "./components/AddBillForm";
import CategoryFilter from "./components/CatagoryFilter";
import TimeSeriesChart from "./components/TimeSeriesChart"; // Import the Time-Series Chart
import { calculateMinimumBills } from "./utils/billUtils"; // Import the utility function

const App = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState(50000); // Sample monthly budget for Level 2
  const [highlightedBills, setHighlightedBills] = useState([]);
  const [showHighlightedBills, setShowHighlightedBills] = useState(false); // Flag to toggle highlighted bills

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

      {/* Bill Form to add new bills */}
      <BillForm addBill={addBill} />

      {/* Bill List with highlighted bills */}
      <BillList
        bills={filteredBills}
        highlightedBills={highlightedBills}
        showHighlightedBills={showHighlightedBills}
      />

      {/* Time-Series Chart */}
      <TimeSeriesChart bills={filteredBills} />
    </div>
  );
};

export default App;
