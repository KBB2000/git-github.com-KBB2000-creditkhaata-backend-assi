const express = require('express');
const router = express.Router();
const { createLoan, getLoans, getSummary, getOverdueLoans } = require('../controllers/loanController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createLoan);  // Ensure createLoan is properly defined
router.get('/', protect, getLoans);  // Ensure getLoans is properly defined
router.get('/summary', protect, getSummary);  // Ensure getSummary is properly defined
router.get('/overdue', protect, getOverdueLoans);  // Ensure getOverdueLoans is properly defined

module.exports = router;
