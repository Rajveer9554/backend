import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./src/models/users.js";


dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existingAdmin = await User.findOne({ email: "awazeejanata@gmail.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    
    await User.create({
      username: "Super Admin",
      email: "awazeejanata@gmail.com",
      password: "awazeejanata9554",
      role: "admin",
      gender:"male",
        age: 30,
      isVerified: true,
      
    });

    console.log("✅ Default admin created");
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

createAdmin();