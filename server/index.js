const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const inputRoutes = require('./routes/inputRoutes');

require('dotenv').config();

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/accounting';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/inputs', inputRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});