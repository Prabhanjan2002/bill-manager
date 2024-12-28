// Function to calculate the minimum set of bills to pay to not exceed the monthly budget
export const calculateMinimumBills = (bills, budget) => {
  // Sort bills by amount in ascending order
  const sortedBills = [...bills].sort(
    (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
  );

  let total = 0;
  const selectedBills = [];

  // Select bills until the budget is reached
  for (const bill of sortedBills) {
    const billAmount = parseFloat(bill.amount);
    if (total + billAmount <= budget) {
      selectedBills.push(bill);
      total += billAmount;
    }
  }

  return selectedBills;
};
