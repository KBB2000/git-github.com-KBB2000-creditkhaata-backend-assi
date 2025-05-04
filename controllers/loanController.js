const Loan = require('../models/Loan');
const Customer = require('../models/Customer');
const moment = require('moment');

// Create loan
exports.createLoan = async (req, res) => {
  const { customerId, amount, dueDate } = req.body;
  try {
    const customer = await Customer.findOne({ _id: customerId, user: req.user.id });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    const loan = await Loan.create({
      user: req.user.id,
      customer: customerId,
      amount,
      dueDate
    });

    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get loans
exports.getLoans = async (req, res) => {
  const { status } = req.query;
  let query = { user: req.user.id };

  if (status === 'overdue') {
    query.dueDate = { $lt: new Date() };
    query.isPaid = false;
  } else if (status === 'paid') {
    query.isPaid = true;
  } else if (status === 'pending') {
    query.isPaid = false;
  }

  try {
    const loans = await Loan.find(query).populate('customer');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get loan summary
exports.getSummary = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id });
    let totalLoaned = 0;
    let totalCollected = 0;
    let overdueAmount = 0;

    for (let loan of loans) {
      totalLoaned += loan.amount;
      totalCollected += loan.amount - loan.balance;
      if (!loan.isPaid && loan.dueDate < new Date()) {
        overdueAmount += loan.balance;
      }
    }

    res.json({ totalLoaned, totalCollected, overdueAmount });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get overdue loans
exports.getOverdueLoans = async (req, res) => {
  try {
    const loans = await Loan.find({
      user: req.user.id,
      dueDate: { $lt: new Date() },
      isPaid: false
    }).populate('customer');

    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
