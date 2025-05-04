const Customer = require('../models/Customer');
const validator = require('validator');

exports.createCustomer = async (req, res) => {
  const { name, phone, trustScore } = req.body;
  if (!validator.isMobilePhone(phone + '', 'en-IN')) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  try {
    const customer = await Customer.create({
      user: req.user.id,
      name,
      phone,
      trustScore
    });
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user.id });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
