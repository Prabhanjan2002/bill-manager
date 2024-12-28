const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");

// Get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Create a new bill
router.post("/", async (req, res) => {
  const { description, category, amount, date } = req.body;
  try {
    const newBill = new Bill({ description, category, amount, date });
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
