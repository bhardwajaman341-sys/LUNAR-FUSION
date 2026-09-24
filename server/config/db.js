import mongoose from 'mongoose';
import dns from 'dns';

// Force Node.js to use Google DNS for SRV queries
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB Atlas Connected Successfully!');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB Connection Error Event: ${err.message}`);
  });

  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
  } catch (error) {
    console.error(`Database Initial Connection Error: ${error.message}`);
  }
};

export default connectDB;