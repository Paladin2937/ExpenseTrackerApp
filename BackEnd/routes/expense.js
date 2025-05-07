const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Add an Expense
router.post("/", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Expense
router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete an Expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
