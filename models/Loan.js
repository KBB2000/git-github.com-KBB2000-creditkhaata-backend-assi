const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  description: String,
  amount: { type: Number, required: true },
  issueDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  frequency: { type: String, enum: ['bi-weekly', 'monthly'], required: true },
  interest: Number,
  graceDays: Number,
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('Loan', loanSchema);