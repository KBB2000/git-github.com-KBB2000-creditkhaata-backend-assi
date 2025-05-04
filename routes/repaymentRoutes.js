const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // <-- Check this line
const { recordRepayment } = require('../controllers/repaymentController');

router.use(protect); 

router.post('/', recordRepayment);

module.exports = router;
