const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  loan: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Repayment', repaymentSchema);