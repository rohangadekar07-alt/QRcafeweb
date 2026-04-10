const mongoose = require("mongoose");

// Disable buffering so that commands fail immediately if connection is down
mongoose.set("bufferCommands", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 2000, // Faster failure if IP not whitelisted
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Do not exit, allow server to run for frontend to at least receive response
  }
};

module.exports = connectDB;
