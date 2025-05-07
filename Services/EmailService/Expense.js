const dotenv = require("dotenv");
const sendMail = require("../helper/sendMail");
const Expense = require("../models/Expense");
dotenv.config();

const expenseEmail = async () => {
  const expenses = await Expense.find();
  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );
  if (totalExpense > 10000) {
    let messageOption = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Expense Alert",
      text: `Total expense is ${totalExpense} and it is greater than 10000`,
    };

    await sendMail(messageOption);
  }
};

module.exports = expenseEmail;
