const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const billRoutes = require("./routes/billRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json

// Use the routes
app.use("/api/bills", billRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
