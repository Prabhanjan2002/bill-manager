import React, { useState, useEffect } from "react";
import BillList from "./components/BillList";
import CategoryFilter from "./components/CatagoryFilter";
import TimeSeriesChart from "./components/TimeSeriesChart";
import EditBillModal from "./components/EditBillModel";
import { calculateMinimumBills } from "./utils/billUtils";
import "./App.css"; // Custom CSS for dark theme

const App = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState(50000);
  const [highlightedBills, setHighlightedBills] = useState([]);
  const [showHighlightedBills, setShowHighlightedBills] = useState(false);
  const [billToEdit, setBillToEdit] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bills");
        const data = await response.json();
        const validBills = data.filter(
          (bill) => bill.date && bill.amount && !isNaN(bill.amount)
        );
        setBills(validBills);
        setFilteredBills(validBills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  const handleCategoryFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredBills(bills);
    } else {
      const filtered = bills.filter((bill) => bill.category === category);
      setFilteredBills(filtered);
    }
  };

  const addBill = (newBill) => {
    setBills((prevBills) => {
      const updatedBills = [...prevBills, newBill];
      setFilteredBills(updatedBills);
      return updatedBills;
    });
  };

  const calculateBillsToPay = () => {
    const result = calculateMinimumBills(bills, monthlyBudget);
    setHighlightedBills(result);
    setShowHighlightedBills(true);
  };

  const deleteBill = async (billId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bills/${billId}`,
        { method: "DELETE" }
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
    }
  };

  const openEditModal = (bill) => {
    setBillToEdit(bill);
  };

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

      setBillToEdit(null);
    } catch (error) {
      console.error("Error editing bill:", error);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="bg-dark text-light text-center py-4 rounded shadow mb-4">
        <h1 className="display-4">Bill Manager</h1>
        <p className="lead">
          Track, analyze, and manage your expenses effortlessly.
        </p>
      </header>

      {/* Main Content */}
      <div className="row g-4">
        {/* Left Section: Filters and Budget */}
        <div className="col-lg-4">
          {/* Filter by Category */}
          <div className="card shadow-sm bg-secondary text-light border-0">
            <div className="card-body">
              <h5 className="card-title">Filter by Category</h5>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryFilterChange}
              />
            </div>
          </div>

          {/* Set Monthly Budget */}
          <div className="card shadow-sm bg-info text-dark mt-4 border-0">
            <div className="card-body">
              <h5 className="card-title">Set Monthly Budget</h5>
              <input
                type="number"
                className="form-control mb-3"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
              />
              <button
                className="btn btn-dark w-100"
                onClick={calculateBillsToPay}
              >
                Calculate Bills to Pay
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Bills and Chart */}
        <div className="col-lg-8">
          {/* Bills List */}
          <div className="card shadow-sm bg-light text-dark border-0 mb-4">
            <div className="card-body">
              <h5 className="card-title">Bills List</h5>
              <BillList
                bills={filteredBills}
                highlightedBills={highlightedBills}
                showHighlightedBills={showHighlightedBills}
                onDelete={deleteBill}
                onEdit={openEditModal}
              />
            </div>
          </div>

          {/* Time-Series Chart */}
          <div className="card shadow-sm bg-dark text-light border-0">
            <div className="card-body">
              <h5 className="card-title">Bills Overview (Time-Series)</h5>
              <TimeSeriesChart bills={filteredBills} />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Bill Modal */}
      {billToEdit && (
        <EditBillModal
          bill={billToEdit}
          onSave={editBill}
          onClose={() => setBillToEdit(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-secondary text-white text-center py-3 mt-5 shadow">
        <p className="mb-0">
          Created with ❤️ by <strong>@PRABHU</strong>
        </p>
      </footer>
    </div>
  );
};

export default App;
