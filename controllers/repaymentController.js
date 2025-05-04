const Repayment = require('../models/Repayment');
const Loan = require('../models/Loan');

exports.recordRepayment = async (req, res) => {
  const { loanId, amount } = req.body;

  try {
    const loan = await Loan.findOne({ _id: loanId, user: req.user.id });
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    const repayment = await Repayment.create({
      loan: loanId,
      amount,
      date: new Date()
    });

    loan.balance -= amount;
    if (loan.balance <= 0) {
      loan.balance = 0;
      loan.isPaid = true;
    }
    await loan.save();

    res.status(201).json(repayment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
