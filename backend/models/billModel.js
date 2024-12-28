const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
