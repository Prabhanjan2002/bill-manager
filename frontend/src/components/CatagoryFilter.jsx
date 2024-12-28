import React from "react";

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="form-group">
      <label>Filter by Category</label>
      <select
        className="form-control"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="FoodNDining">Food & Dining</option>
        <option value="Utility">Utility</option>
        <option value="Shopping">Shopping</option>
        <option value="Education">Education</option>
        <option value="Personal Care">Personal Care</option>
        <option value="Travel">Travel</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
