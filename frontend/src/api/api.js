import axios from "axios";

const API_URL = "http://localhost:5000/api/bills";

export const fetchBills = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addBill = async (billData) => {
  const response = await axios.post(API_URL, billData);
  return response.data;
};
