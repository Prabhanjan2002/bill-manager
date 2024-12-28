const express = require("express");
const Bill = require("../models/billModel"); // Assuming your Bill model is defined here
const router = express.Router();

// POST route to add a new bill
router.post("/", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(201).json(newBill); // Send the newly created bill as the response
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error adding bill", error });
  }
});

// GET route to fetch all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find(); // Fetch all bills from the database
    res.status(200).json(bills); // Send the list of bills as the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bills", error });
  }
});

module.exports = router;
