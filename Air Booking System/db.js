const mongoose = require('mongoose');


const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://krizvibusiness:airbooking123@cluster0.vyc59f3.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
      });
      console.log('Connected to MongoDB Atlas cluster');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); 
    }
  };

module.exports = connectDB;
