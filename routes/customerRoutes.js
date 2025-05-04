const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Ensure the protection middleware is used
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');

router.use(protect);

router.post('/',protect, createCustomer);  
router.get('/',protect, getCustomers); 
router.put('/:id', updateCustomer);  
router.delete('/:id', deleteCustomer);  

module.exports = router;
