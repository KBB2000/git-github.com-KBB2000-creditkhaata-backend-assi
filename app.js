const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const loanRoutes = require('./routes/loanRoutes');
const repaymentRoutes = require('./routes/repaymentRoutes');
const { protect } = require('./middleware/authMiddleware');
const bodyParser = require('body-parser');

dotenv.config();
connectDB();


const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', protect, customerRoutes);
app.use('/api/loans', protect, loanRoutes);
app.use('/api/repayments', protect, repaymentRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));