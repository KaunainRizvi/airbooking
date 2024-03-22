const express = require('express');
const connectDB = require('./db'); 
const userRoutes = require('./routes/userRoutes');  // Correct import
const flightRoutes = require('./routes/flightRoutes');  // Correct import
const bookingRoutes = require('./routes/bookingRoutes');  // Correct import

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/api', userRoutes);
app.use('/api', flightRoutes);
app.use('/api', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Air Ticket Booking System');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
