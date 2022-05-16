import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to database!")
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit();
  }
}

export default connectDB;
