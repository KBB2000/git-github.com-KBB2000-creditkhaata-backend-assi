const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  trustScore: { type: Number, min: 0, max: 10 },
  creditLimit: { type: Number, default: 0 },
});

module.exports = mongoose.model('Customer', customerSchema);
