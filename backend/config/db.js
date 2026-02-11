import e from 'express';
import mongoose from 'mongoose';

const connectDB  = async()=>{
    await mongoose.connect(`${process.env.MONGO_URI}/qc360`);
    console.log("Connected to MongoDB");
}

export default connectDB;